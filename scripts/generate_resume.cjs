const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateResumePDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const margin = 40;
  let y = height - 40;

  // Colors
  const dark = rgb(0.1, 0.1, 0.1);
  const muted = rgb(0.35, 0.35, 0.35);
  const primary = rgb(0.05, 0.45, 0.75);
  const lineCol = rgb(0.8, 0.8, 0.85);

  function drawSectionHeader(title) {
    y -= 14;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 10,
      font: fontBold,
      color: dark,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.75,
      color: lineCol,
    });
    y -= 10;
  }

  function drawText(text, size = 8.5, font = fontRegular, color = dark, indent = 0) {
    const maxWidth = width - 2 * margin - indent;
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? ' ' : '') + words[i];
      const textWidth = font.widthOfTextAtSize(testLine, size);

      if (textWidth > maxWidth && line) {
        page.drawText(line, { x: margin + indent, y, size, font, color });
        y -= size + 3;
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: margin + indent, y, size, font, color });
      y -= size + 3;
    }
  }

  function drawBullet(text, size = 8.5) {
    page.drawText('•', { x: margin + 8, y, size, font: fontRegular, color: dark });
    drawText(text, size, fontRegular, dark, 20);
    y -= 1;
  }

  // Header - Name
  const name = 'VINESH SHANMUGAM';
  const nameWidth = fontBold.widthOfTextAtSize(name, 18);
  page.drawText(name, {
    x: (width - nameWidth) / 2,
    y,
    size: 18,
    font: fontBold,
    color: dark,
  });
  y -= 15;

  // Subtitle
  const sub = 'ECE ENGINEER | AI/ML | EMBEDDED SYSTEMS | IoT | FULL-STACK DEVELOPMENT';
  const subWidth = fontBold.widthOfTextAtSize(sub, 8.5);
  page.drawText(sub, {
    x: (width - subWidth) / 2,
    y,
    size: 8.5,
    font: fontBold,
    color: primary,
  });
  y -= 13;

  // Contact Info
  const contact = 'shanmugamvinesh75@gmail.com | github.com/Vinzz006 | linkedin.com/in/vinesh-shanmugam-109215363 | +91 63851 07219 | Chennai, Tamil Nadu';
  const contactWidth = fontRegular.widthOfTextAtSize(contact, 7.5);
  page.drawText(contact, {
    x: (width - contactWidth) / 2,
    y,
    size: 7.5,
    font: fontRegular,
    color: muted,
  });
  y -= 8;

  // Summary
  drawSectionHeader('SUMMARY');
  drawText(
    'Electronics & Communication Engineering student who builds intelligent, cloud-connected hardware-software systems spanning embedded devices, AI/ML, and full-stack web applications. Experienced in developing ESP32-based sensing pipelines, training and deploying machine learning models, and building REST APIs and React dashboards that turn real-world sensor data into actionable insight.',
    8.5
  );

  // Technical Skills
  drawSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Programming:', val: 'Python, Java, C, C++, JavaScript, TypeScript, SQL' },
    { label: 'AI / Machine Learning:', val: 'TensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy, Hugging Face, Computer Vision, TinyML' },
    { label: 'Embedded Systems / IoT:', val: 'ESP32, ESP8266, Arduino, Sensors, I2C, UART, GPIO, MQTT' },
    { label: 'Frontend:', val: 'React, TypeScript, Vite, Tailwind CSS, Chart.js, Recharts' },
    { label: 'Backend:', val: 'FastAPI, Flask, Node.js, REST APIs, WebSockets' },
    { label: 'Database / Cloud:', val: 'Firebase, PostgreSQL, SQLAlchemy' },
    { label: 'DevOps / Tools:', val: 'Git, GitHub, Docker, CI/CD, Vercel, Render, VS Code, Arduino IDE, Google Colab' },
  ];

  skills.forEach(({ label, val }) => {
    const line = `${label} ${val}`;
    drawText(line, 8.2);
    y -= 0.5;
  });

  // Projects
  drawSectionHeader('PROJECTS');

  // Project 1
  page.drawText('TinyML-Based Human Activity & Fall Detection', { x: margin, y, size: 9, font: fontBold, color: dark });
  page.drawText(' — ESP32 · Accelerometer · Python · Scikit-learn · TensorFlow · TinyML · Firebase', { x: margin + 205, y, size: 8, font: fontOblique, color: muted });
  y -= 11;
  drawBullet('Designed an end-to-end embedded AI pipeline that acquires accelerometer motion data on an ESP32, applies signal processing and feature extraction, and classifies human activity to detect falls in real time.');
  drawBullet('Trained and evaluated a TinyML classification model using Scikit-learn and TensorFlow, then optimized it for on-device inference on resource-constrained embedded hardware.');
  drawBullet('Integrated the ESP32 sensing node with Firebase to stream classification results to a cloud dashboard for real-time activity monitoring.');
  y -= 4;

  // Project 2
  page.drawText('PancreaSense AI', { x: margin, y, size: 9, font: fontBold, color: dark });
  page.drawText(' — React · TypeScript · FastAPI · PostgreSQL · SQLAlchemy · ESP32 · Machine Learning · SHAP', { x: margin + 80, y, size: 8, font: fontOblique, color: muted });
  y -= 11;
  drawBullet('Built a research-prototype healthcare AI platform combining ESP32-based sensor data acquisition with a FastAPI backend and PostgreSQL data layer for structured health-data management.');
  drawBullet('Implemented a machine learning risk-assessment model with SHAP-based explainability to surface interpretable, feature-level insights for AI-assisted screening rather than diagnosis.');
  drawBullet('Developed a React and TypeScript dashboard to visualize risk indicators and model explanations for end users of the experimental platform.');
  y -= 4;

  // Project 3
  page.drawText('SmartWatts', { x: margin, y, size: 9, font: fontBold, color: dark });
  page.drawText(' — ESP32 · Firebase · React · FastAPI · Machine Learning', { x: margin + 60, y, size: 8, font: fontOblique, color: muted });
  y -= 11;
  drawBullet('Engineered a cloud-connected IoT system for real-time electricity monitoring, using ESP32 nodes to collect consumption data and stream it to Firebase.');
  drawBullet('Built a FastAPI backend and React dashboard for energy analytics, visualizing usage trends and flagging abnormal consumption patterns.');
  drawBullet('Applied a machine learning component to generate intelligent, usage-based recommendations for more efficient energy consumption.');
  y -= 4;

  // Project 4
  page.drawText('Transit Assist', { x: margin, y, size: 9, font: fontBold, color: dark });
  page.drawText(' — Computer Vision · AI · Object Detection · Maps APIs', { x: margin + 68, y, size: 8, font: fontOblique, color: muted });
  y -= 11;
  drawBullet('Developed a computer vision-based transportation assistance system using object detection to identify transit vehicles and relevant surroundings in real time.');
  drawBullet('Integrated navigation and mapping APIs to provide real-time route and transit information, with an accessibility-oriented interaction design.');
  y -= 4;

  // Project 5
  page.drawText('DevOpsGuard', { x: margin, y, size: 9, font: fontBold, color: dark });
  page.drawText(' — Python · FastAPI · Docker · GitHub · CI/CD', { x: margin + 70, y, size: 8, font: fontOblique, color: muted });
  y -= 11;
  drawBullet('Built a containerized DevOps automation tool with a FastAPI backend and REST API architecture to monitor development and deployment workflows, using Docker and GitHub-based CI/CD concepts.');

  // Experience
  drawSectionHeader('EXPERIENCE');
  page.drawText('Wireless Communication Engineering Intern — BSNL', { x: margin, y, size: 9, font: fontBold, color: dark });
  y -= 11;
  drawBullet('Gained hands-on exposure to wireless communication infrastructure at a telecom service provider, including cellular network architecture, base station equipment, and signal transmission systems.');
  drawBullet('Assisted in monitoring signal quality and network performance, and studied RF propagation and GSM/LTE network fundamentals in a live telecom environment under engineer supervision.');

  // Education
  drawSectionHeader('EDUCATION');
  page.drawText('Bachelor of Engineering (B.E.) in Electronics & Communication Engineering', { x: margin, y, size: 9, font: fontBold, color: dark });
  page.drawText('2024 – 2028', { x: width - margin - 55, y, size: 9, font: fontBold, color: dark });
  y -= 12;
  page.drawText('Meenakshi Sundararajan Engineering College, Chennai, Tamil Nadu', { x: margin, y, size: 8.5, font: fontRegular, color: muted });
  y -= 8;

  // Research Interests
  drawSectionHeader('RESEARCH INTERESTS');
  drawText('TinyML · Edge AI · Intelligent IoT · Healthcare AI · Computer Vision · Embedded Intelligence · Signal Processing', 8.5, fontRegular, dark);

  // Save
  const pdfBytes = await pdfDoc.save();
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'Vinesh_Shanmugam_Resume.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);
  console.log('Successfully generated Vinesh_Shanmugam_Resume.pdf and resume.pdf');
}

generateResumePDF().catch(console.error);
