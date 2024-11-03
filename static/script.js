document.getElementById("startButton").addEventListener("click", startTest);

async function startTest() {
  const startButton = document.getElementById("startButton");
  const downloadResult = document.getElementById("download-result");
  const uploadResult = document.getElementById("upload-result");
  const pingResult = document.getElementById("ping-result");

  startButton.textContent = "In Progress...";
  downloadResult.textContent = "Loading...";
  uploadResult.textContent = "Loading...";
  pingResult.textContent = "Loading...";

  try {
    const response = await fetch("/api/speedtest");
    const data = await response.json();

    if (data.error) {
      downloadResult.textContent = data.error;
      uploadResult.textContent = "";
      pingResult.textContent = "";
    } else {
      downloadResult.textContent = `${data.download.toFixed(2)} Mbps (${(
        data.download / 8
      ).toFixed(2)} MBps)`;
      uploadResult.textContent = `${data.upload.toFixed(2)} Mbps (${(
        data.upload / 8
      ).toFixed(2)} MBps)`;
      pingResult.textContent = `${data.ping} ms`;
    }
  } catch (error) {
    downloadResult.textContent = "Error: Could not connect";
    uploadResult.textContent = "";
    pingResult.textContent = "";
  } finally {
    startButton.textContent = "Start Speed Test";
  }
}
