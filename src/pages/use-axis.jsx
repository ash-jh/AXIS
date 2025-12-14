import React, { useState, useRef } from "react";
import CardNav from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Helper functions
function parseCSV(text) {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((r) => r.split(/,|;|\t/).map((c) => c.trim()));
  const header = rows[0];
  const data = rows.slice(1).map((r) => {
    const obj = {};
    header.forEach((h, i) => {
      obj[h] = r[i] === undefined ? "" : r[i];
    });
    return obj;
  });
  return { header, data };
}

function toNumberArray(data, colName) {
  return data.map((r) => {
    const v = r[colName];
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  });
}

function computeRMS(values) {
  const valid = values.filter((v) => !Number.isNaN(v));
  if (valid.length === 0) return NaN;
  const sumSq = valid.reduce((s, v) => s + v * v, 0);
  return Math.sqrt(sumSq / valid.length);
}

function computePeak(values) {
  const valid = values.filter((v) => !Number.isNaN(v));
  if (valid.length === 0) return NaN;
  return Math.max(...valid.map(Math.abs));
}

function computeDFT(values) {
  const n = values.length;
  if (n === 0) return [];
  const re = new Array(n).fill(0);
  const im = new Array(n).fill(0);
  for (let k = 0; k < n; k++) {
    for (let t = 0; t < n; t++) {
      const angle = (2 * Math.PI * t * k) / n;
      re[k] += values[t] * Math.cos(angle);
      im[k] -= values[t] * Math.sin(angle);
    }
  }
  const mags = [];
  for (let k = 0; k < Math.floor(n / 2); k++) {
    mags.push({ freq: k, magnitude: Math.sqrt(re[k] * re[k] + im[k] * im[k]) });
  }
  return mags;
}

function detectAnomalies(values, threshold = 3) {
  const valid = values.filter((v) => !Number.isNaN(v));
  if (valid.length === 0) return [];
  const mean = valid.reduce((s, v) => s + v, 0) / valid.length;
  const variance =
    valid.reduce((s, v) => s + (v - mean) ** 2, 0) / valid.length;
  const std = Math.sqrt(variance);
  const anomalies = [];
  values.forEach((v, i) => {
    if (Number.isNaN(v)) return;
    const z = std === 0 ? 0 : Math.abs((v - mean) / std);
    if (z > threshold) anomalies.push({ index: i, value: v, z });
  });
  return anomalies;
}

// Main Component
const BridgeHealthDashboard = () => {
  const [fileName, setFileName] = useState(null);
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [rms, setRms] = useState(null);
  const [peak, setPeak] = useState(null);
  const [fft, setFft] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [healthStatus, setHealthStatus] = useState("unknown");
  const [selectedColumn, setSelectedColumn] = useState("");
  const reportRef = useRef();

  const addMessage = (m) => {
    setMessages((prev) => [m, ...prev].slice(0, 10));
  };

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setLoading(true);
    setFileName(f.name);
    addMessage(`Uploaded file ${f.name}`);

    const text = await f.text();
    try {
      const parsed = parseCSV(text);
      setHeader(parsed.header);
      setData(parsed.data);
      addMessage(
        `Parsed CSV with ${parsed.data.length} rows and ${parsed.header.length} columns`
      );
      validateAndProcess(parsed.header, parsed.data);
    } catch (err) {
      addMessage("Error parsing CSV: " + (err.message || err));
    }
    setLoading(false);
  };

  const validateAndProcess = (h, d) => {
    const lower = h.map((hh) => hh.toLowerCase());
    let preferredIndex = lower.findIndex((hh) =>
      /vib|acc|sensor|amplitude|value/.test(hh)
    );
    if (preferredIndex === -1) preferredIndex = 0;

    const colName = h[preferredIndex];
    setSelectedColumn(colName);

    const numeric = toNumberArray(d, colName);
    const missingCount = numeric.filter(Number.isNaN).length;
    if (missingCount > 0)
      addMessage(
        `${missingCount} missing or non-numeric values found in column ${colName}`
      );

    processData(numeric, colName);
  };

  const processData = (values, colName) => {
    setLoading(true);
    setTimeout(() => {
      const computedRms = computeRMS(values);
      setRms(computedRms);
      const computedPeak = computePeak(values);
      setPeak(computedPeak);
      const computedFft = computeDFT(values);
      setFft(computedFft.slice(0, Math.min(200, computedFft.length)));
      const detected = detectAnomalies(values, 3);
      setAnomalies(detected);

      let status = "Normal";
      if (
        detected.length > Math.max(5, values.length * 0.01) ||
        computedPeak > computedRms * 10
      )
        status = "Needs Attention";
      if (computedPeak > computedRms * 20) status = "Critical";
      setHealthStatus(status);

      addMessage(`Processing complete — status: ${status}`);
      setLoading(false);
    }, 600);
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    const node = reportRef.current;
    const canvas = await html2canvas(node, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`BridgeHealthReport_${fileName || "report"}.pdf`);
  };

  const previewRows = data.slice(0, 10);
  const chartData = data.map((row, i) => ({
    index: i,
    value: Number(row[selectedColumn]),
  }));

  const items = [
    {
      label: "About",
      bgColor: "#f0f0f0",
      textColor: "#000",
      links: [
        { label: "Team", ariaLabel: "About Members" },
        { label: "Work Snippets", ariaLabel: "Work Snippets" },
      ],
    },
    {
      label: "Project",
      bgColor: "#f0f0f0",
      textColor: "#000",
      links: [
        { label: "Phases", ariaLabel: "Featured Projects" },
        { label: "Concepts behind", ariaLabel: "Concepts behind the project" },
        { label: "Our Approach", ariaLabel: "Methodology" },
      ],
    },
    {
      label: "Formatted Content",
      bgColor: "#f0f0f0",
      textColor: "#000",
      links: [
        { label: "Concept Paper", ariaLabel: "Paper" },
        { label: "Poster", ariaLabel: "Poster" },
        { label: "Report", ariaLabel: "Report" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center">
      <CardNav
        logo="axis-logo.png"
        logoAlt="AXIS Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <div className="w-full pt-30 pl-20 pr-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload card */}
          <div className="col-span-1 bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-medium mb-2">CSV Upload</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
              <input
                onChange={handleFile}
                type="file"
                accept=".csv,text/csv"
                className="w-full opacity-0 absolute h-24"
              />
              <div className="text-center pointer-events-none">
                <div className="px-4 py-6">
                  <p className="text-sm text-gray-400">
                    Drag & drop or click to upload CSV
                  </p>
                  <p className="text-xs text-gray-300 mt-2">
                    (columns: timestamp, vibration, ...)
                  </p>
                </div>
                {fileName && (
                  <div className="mt-2 text-sm text-gray-700">
                    Uploaded: <strong>{fileName}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium">Validation</h3>
              <ul className="text-xs mt-2 text-gray-600">
                <li>Columns detected: {header.length}</li>
                <li>Preview rows: {previewRows.length}</li>
                <li>
                  Selected column: <strong>{selectedColumn || "—"}</strong>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium">Messages</h3>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                {messages.length === 0 && (
                  <div className="text-gray-300">No messages yet</div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className="bg-gray-50 p-2 rounded">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main analysis card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <h2 className="font-medium">Data Processing & Analysis</h2>
              <div className="flex items-center gap-3">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    healthStatus === "Normal"
                      ? "bg-green-100 text-green-800"
                      : healthStatus === "Needs Attention"
                      ? "bg-yellow-100 text-yellow-800"
                      : healthStatus === "Critical"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Status: {healthStatus}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">RMS</div>
                <div className="text-xl font-semibold">
                  {loading
                    ? "..."
                    : Number.isFinite(rms)
                    ? rms.toFixed(3)
                    : "—"}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">Peak</div>
                <div className="text-xl font-semibold">
                  {loading
                    ? "..."
                    : Number.isFinite(peak)
                    ? peak.toFixed(3)
                    : "—"}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">Anomalies</div>
                <div className="text-xl font-semibold">
                  {loading ? "..." : anomalies.length}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Vibration vs Time</h3>
                  <div className="text-xs text-gray-500">
                    Column:{" "}
                    <select
                      value={selectedColumn}
                      onChange={(e) => {
                        setSelectedColumn(e.target.value);
                        processData(
                          toNumberArray(data, e.target.value),
                          e.target.value
                        );
                      }}
                      className="ml-2 border rounded px-2 py-1 text-xs"
                    >
                      {header.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ width: "100%", height: 220 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="index" hide />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4F46E5"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3 border">
                <h3 className="text-sm font-medium mb-2">
                  Frequency Spectrum (magnitude)
                </h3>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <LineChart
                      data={fft.map((f) => ({
                        freq: f.freq,
                        mag: f.magnitude,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="freq" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="mag" stroke="#06b6d4" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border">
                <h3 className="text-sm font-medium mb-2">Detected Anomalies</h3>
                <div className="text-xs text-gray-600">
                  Showing up to 10 anomalies
                </div>
                <div className="mt-2 text-sm">
                  {anomalies.length === 0 && (
                    <div className="text-gray-400">No anomalies detected.</div>
                  )}
                  {anomalies.slice(0, 10).map((a) => (
                    <div
                      key={a.index}
                      className="flex justify-between py-1 border-b"
                    >
                      <div>Index {a.index}</div>
                      <div className="text-red-600">{a.value.toFixed(3)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report generation */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Report Generation</h2>
            <div className="flex gap-3">
              <button
                onClick={generatePDF}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm"
              >
                Export as PDF
              </button>
            </div>
          </div>

          <div ref={reportRef} className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-semibold">Bridge Health Report</h3>
            <p className="text-sm text-gray-600">
              Bridge ID: <strong>Auto-detected / Enter manually</strong>
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">RMS</div>
                <div className="font-semibold">
                  {Number.isFinite(rms) ? rms.toFixed(3) : "—"}
                </div>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">Peak</div>
                <div className="font-semibold">
                  {Number.isFinite(peak) ? peak.toFixed(3) : "—"}
                </div>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">Condition</div>
                <div className="font-semibold">{healthStatus}</div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Summary</h4>
              <p className="text-sm text-gray-600 mt-2">
                This report summarises the key statistics extracted from the
                uploaded sensor dataset. It highlights RMS vibration, peak
                events, frequency content, and any anomalous samples that may
                indicate structural issues.
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Graphs</h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-2">
                  (Vibration vs Time chart snapshot)
                </div>
                <div className="bg-white rounded p-2">
                  (Frequency spectrum snapshot)
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Detected issues</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {anomalies.length === 0 ? (
                  <li>
                    No anomalous activity detected in the selected column.
                  </li>
                ) : (
                  anomalies.slice(0, 10).map((a) => (
                    <li key={a.index}>
                      Sample at index {a.index} shows an unusual amplitude{" "}
                      {a.value.toFixed(3)} (z={a.z.toFixed(2)})
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-medium">Assessment</h4>
              <div className="mt-2 p-3 bg-white rounded">
                Overall health: <strong>{healthStatus}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Data preview optional */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-medium">Data Preview</h3>
            <div className="mt-2 text-xs text-gray-600 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr>
                    {header.map((h) => (
                      <th key={h} className="px-2 py-1 text-gray-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((r, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-2 py-1" colSpan={header.length}>
                        {JSON.stringify(r)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-medium">Quick Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  if (selectedColumn)
                    processData(
                      toNumberArray(data, selectedColumn),
                      selectedColumn
                    );
                }}
                className="px-3 py-2 rounded bg-gray-100 text-sm"
              >
                Re-run Analysis
              </button>
              <button
                onClick={() => {
                  setData([]);
                  setHeader([]);
                  setFileName(null);
                  setMessages([]);
                  setRms(null);
                  setPeak(null);
                  setFft([]);
                  setAnomalies([]);
                  setHealthStatus("unknown");
                }}
                className="px-3 py-2 rounded bg-red-50 text-sm text-red-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-xs text-gray-400">
          Prototype · UI-first dashboard · Responsive
        </footer>
      </div>
    </div>
  );
};

export default BridgeHealthDashboard;
