function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function convertToWakandan(name) {
    if (!name || name.trim().length === 0) return { visual: "N/A", phonetic: "N/A" };

    let originalName = name.trim().toLowerCase();

    // Step 1: Determine prefix, transformation, and suffix using hash
    let nameHash = hashCode(originalName);
    let prefixes = ["M’", "T’", "N’", "D’", "Z’"];
    let suffixes = ["-zu", "-mbu", "-ka", "-ngo", "-dari", "-baku", "-nabe"];

    let prefix = prefixes[nameHash % prefixes.length];
    let suffix = suffixes[nameHash % suffixes.length];

    // Step 2: Apply Wakandan-style vowel/consonant transformations
    let transformedName = originalName
        .replace(/th/g, "t’")  // "Thanos" → "T’anos"
        .replace(/ph/g, "p’")  // "Philip" → "P’ilip"
        .replace(/ch/g, "k’")  // "Charles" → "K’harles"
        .replace(/a/g, "a")  
        .replace(/e/g, "o")  
        .replace(/i/g, "u")  
        .replace(/o/g, "e")  
        .replace(/u/g, "i");

    // Step 3: Generate final Wakandan name (same result every time)
    let visual = prefix + transformedName + suffix;
    let phonetic = visual.replace(/[’]/g, ""); // Remove clicks for speech synthesis

    return { visual, phonetic };
}

function translateName() {
    let nameInput = document.getElementById("nameInput").value;
    let { visual, phonetic } = convertToWakandan(nameInput);

    document.getElementById("wakandanName").innerHTML = 
        visual !== "N/A" 
        ? `If you were from Wakanda, your name would be: <strong>${visual}</strong>` 
        : "No translation found!";

    document.getElementById("wakandanFont").innerHTML = visual;
    document.getElementById("wakandanFont").style.fontFamily = "Wakandan";

    // Store phonetic version for speech synthesis
    document.getElementById("speakButton").dataset.phoneticName = phonetic;

    if (visual !== "N/A") {
        document.getElementById("speakButton").style.display = "block";
    } else {
        document.getElementById("speakButton").style.display = "none";
    }
}

function speakName() {
    let phoneticName = document.getElementById("speakButton").dataset.phoneticName;
    let speech = new SpeechSynthesisUtterance(phoneticName);
    speech.lang = "en";
    speech.rate = 0.85;
    window.speechSynthesis.speak(speech);
}

function goHome() {
    window.location.href = "../../index.html"; // Change this to your home page URL if needed
}