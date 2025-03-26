// script.js
document.getElementById('load-org-btn').addEventListener('click', async () => {
    const orgInfoParagraph = document.getElementById('org-info');
    orgInfoParagraph.textContent = "Loading...";
  
    try {
      // Request org data from backend API (assumes backend is running)
      const response = await fetch('/api/org');
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
  
      // Format the data into a string (Manager + Direct Reports)
      let text = "";
      if (data.Managers && data.Managers.length > 0) {
        const manager = data.Managers[0];
        text += `Manager: ${manager.displayName} (${manager.jobTitle})\n`;
      }
      if (data.DirectReports && data.DirectReports.length > 0) {
        text += `Direct Reports: ${data.DirectReports.map(d => d.displayName).join(', ')}`;
      }
      if (text === "") {
        text = "No organization data available.";
      }
  
      // Insert the formatted text into the page
      orgInfoParagraph.textContent = text;
    } catch (err) {
      console.error("Failed to load org info", err);
      orgInfoParagraph.textContent = "Error loading organization info.";
    }
  });
  