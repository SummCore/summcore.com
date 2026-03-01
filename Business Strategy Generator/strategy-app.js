const {
  useState
} = React;

// AI Logic Templates and Generators
const generateSWOT = formData => {
  const productServiceText = formData.businessType === 'product' ? 'product' : formData.businessType === 'service' ? 'service' : 'product/service';
  return {
    strengths: [`Strong brand recognition potential for ${formData.businessName}`, `Innovative ${productServiceText} offering in ${formData.industry}`, `Deep understanding of ${formData.targetMarket} needs`, `${formData.maturityLevel === 'established' ? 'Proven track record and experience' : 'Agility and adaptability as a ' + formData.maturityLevel}`],
    weaknesses: [`Limited market presence in ${formData.industry}`, `Resource constraints typical of ${formData.maturityLevel} businesses`, `Dependency on key personnel or suppliers`, `Need for stronger digital presence and marketing`],
    opportunities: [`Expand into new segments within ${formData.targetMarket}`, `Leverage technology to improve ${productServiceText} delivery`, `Form strategic partnerships in ${formData.industry}`, `Growing demand for solutions that ${formData.problemSolved || 'solve customer problems'}`],
    threats: [`Increasing competition in ${formData.industry}`, `Economic fluctuations affecting ${formData.targetMarket}`, `Regulatory changes impacting ${productServiceText} offerings`, `Technological disruption in the ${formData.industry} sector`]
  };
};
const generateBMC = formData => {
  const productServiceText = formData.businessType === 'product' ? 'product' : formData.businessType === 'service' ? 'service' : 'product/service';
  return {
    customerSegments: [`Primary: ${formData.targetMarket}`, `Secondary: Adjacent markets in ${formData.industry}`, `Early adopters seeking ${productServiceText} innovation`],
    valuePropositions: [`Solves: ${formData.problemSolved || 'Key customer pain points'}`, `Delivers superior ${productServiceText} experience`, `Cost-effective solution for ${formData.targetMarket}`],
    channels: [`Direct sales and ${formData.businessType === 'service' ? 'consultation' : 'distribution'}`, `Digital marketing and online presence`, `Partner networks in ${formData.industry}`],
    customerRelationships: [`Personal assistance and support`, `Community building around ${formData.businessName}`, `Self-service options for routine needs`],
    revenueStreams: [`${formData.businessType === 'product' ? 'Product sales' : 'Service fees'}`, `Subscription or recurring revenue model`, `Premium features and add-on services`],
    keyActivities: [`${productServiceText} development and improvement`, `Marketing and customer acquisition`, `Quality assurance and customer support`],
    keyResources: [`Skilled team with ${formData.industry} expertise`, `Technology and ${formData.businessType === 'product' ? 'manufacturing' : 'service delivery'} capabilities`, `Brand reputation and customer relationships`],
    keyPartnerships: [`Suppliers and vendors in ${formData.industry}`, `Technology partners and integrators`, `Distribution and channel partners`],
    costStructure: [`${formData.businessType === 'product' ? 'Production and inventory' : 'Service delivery'} costs`, `Marketing and customer acquisition expenses`, `Technology infrastructure and maintenance`]
  };
};
const generate90DayPlan = formData => {
  const goals = formData.goals.filter(goal => goal.trim() !== '');
  return {
    month1: {
      focus: "Foundation & Setup",
      priorities: [`Establish core operations for ${formData.businessName}`, `Complete market research in ${formData.targetMarket}`, goals[0] ? `Begin work on: ${goals[0]}` : "Set up essential business processes"],
      metrics: ["Basic infrastructure in place", "Initial customer feedback collected", "Core team assembled and trained"]
    },
    month2: {
      focus: "Growth & Optimization",
      priorities: [`Scale ${formData.businessType} delivery capabilities`, `Implement marketing strategy for ${formData.targetMarket}`, goals[1] ? `Progress on: ${goals[1]}` : "Optimize customer acquisition process"],
      metrics: ["Customer base growing by 20%", "Operational efficiency improved", "Revenue targets on track"]
    },
    month3: {
      focus: "Expansion & Refinement",
      priorities: [`Expand reach within ${formData.industry}`, `Refine ${formData.businessType} offering based on feedback`, goals[2] ? `Achieve: ${goals[2]}` : "Prepare for next growth phase"],
      metrics: ["Market position strengthened", "Customer satisfaction > 85%", "Ready for next quarter planning"]
    }
  };
};

// Main App Component
const App = () => {
  const [currentStep, setCurrentStep] = useState('home');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'product',
    industry: '',
    targetMarket: '',
    goals: ['', '', ''],
    maturityLevel: 'startup',
    problemSolved: ''
  });
  const [strategyTypes, setStrategyTypes] = useState([]);
  const [output, setOutput] = useState(null);
  const toggleType = t => setStrategyTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle form input changes
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle goal input changes
  const handleGoalChange = (index, value) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData(prev => ({
      ...prev,
      goals: newGoals
    }));
  };

  // Validate form data
  const isFormValid = () => {
    return formData.businessName.trim() && formData.industry.trim() && formData.targetMarket.trim();
  };

  // Generate strategy
  const generateStrategy = async () => {
    if (strategyTypes.length === 0) return;
    setIsGenerating(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = {};
    if (strategyTypes.includes('SWOT')) result.SWOT = generateSWOT(formData);
    if (strategyTypes.includes('BMC')) result.BMC = generateBMC(formData);
    if (strategyTypes.includes('90Day')) result['90Day'] = generate90DayPlan(formData);
    setOutput(result);
    setIsGenerating(false);
    setCurrentStep('output');
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!output) return;
    const sections = [];
    if (output.SWOT) {
      sections.push(`SWOT Analysis for ${formData.businessName}\n\n` + `Strengths:\n${output.SWOT.strengths.map(s => `• ${s}`).join('\n')}\n\n` + `Weaknesses:\n${output.SWOT.weaknesses.map(w => `• ${w}`).join('\n')}\n\n` + `Opportunities:\n${output.SWOT.opportunities.map(o => `• ${o}`).join('\n')}\n\n` + `Threats:\n${output.SWOT.threats.map(t => `• ${t}`).join('\n')}`);
    }
    if (output.BMC) {
      sections.push(`Business Model Canvas for ${formData.businessName}\n\n` + Object.entries(output.BMC).map(([key, values]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:\n${values.map(v => `• ${v}`).join('\n')}`).join('\n\n'));
    }
    if (output['90Day']) {
      sections.push(`90-Day Roadmap for ${formData.businessName}\n\n` + Object.entries(output['90Day']).map(([month, data]) => `${month.toUpperCase()}\nFocus: ${data.focus}\nPriorities:\n${data.priorities.map(p => `• ${p}`).join('\n')}\nMetrics:\n${data.metrics.map(m => `• ${m}`).join('\n')}`).join('\n\n'));
    }
    navigator.clipboard.writeText(sections.join('\n\n---\n\n')).then(() => {
      alert('Copied to clipboard!');
    });
  };

  // Download as PDF
  const downloadPDF = () => {
    if (!output) return;
    const {
      jsPDF
    } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Business Strategy Report — ${formData.businessName}`, 10, 20);
    let y = 35;
    if (output.SWOT) {
      doc.setFontSize(16);
      doc.text('SWOT Analysis', 10, y);
      y += 12;
      ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(category => {
        doc.setFontSize(14);
        doc.text(category.charAt(0).toUpperCase() + category.slice(1), 10, y);
        y += 10;
        doc.setFontSize(10);
        output.SWOT[category].forEach(item => {
          const lines = doc.splitTextToSize(`• ${item}`, 180);
          doc.text(lines, 15, y);
          y += lines.length * 5;
        });
        y += 5;
      });
      y += 8;
    }
    if (output.BMC) {
      doc.setFontSize(16);
      doc.text('Business Model Canvas', 10, y);
      y += 12;
      Object.entries(output.BMC).forEach(([key, values]) => {
        doc.setFontSize(14);
        doc.text(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), 10, y);
        y += 10;
        doc.setFontSize(10);
        values.forEach(item => {
          const lines = doc.splitTextToSize(`• ${item}`, 180);
          doc.text(lines, 15, y);
          y += lines.length * 5;
        });
        y += 5;
      });
      y += 8;
    }
    if (output['90Day']) {
      doc.setFontSize(16);
      doc.text('90-Day Roadmap', 10, y);
      y += 12;
      Object.entries(output['90Day']).forEach(([month, data]) => {
        doc.setFontSize(14);
        doc.text(month.toUpperCase(), 10, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(`Focus: ${data.focus}`, 15, y);
        y += 10;
        doc.text('Priorities:', 15, y);
        y += 8;
        doc.setFontSize(10);
        data.priorities.forEach(priority => {
          const lines = doc.splitTextToSize(`• ${priority}`, 170);
          doc.text(lines, 20, y);
          y += lines.length * 5;
        });
        y += 5;
        doc.setFontSize(12);
        doc.text('Metrics:', 15, y);
        y += 8;
        doc.setFontSize(10);
        data.metrics.forEach(metric => {
          const lines = doc.splitTextToSize(`• ${metric}`, 170);
          doc.text(lines, 20, y);
          y += lines.length * 5;
        });
        y += 10;
      });
    }
    doc.save(`${formData.businessName}_${strategyTypes.join('_')}_Strategy.pdf`);
  };

  // Download as JSON
  const downloadJSON = () => {
    if (!output) return;
    const data = {
      businessInfo: formData,
      strategyTypes,
      generatedStrategy: output,
      createdAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.businessName}_${strategyTypes.join('_')}_Strategy.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render Home Page
  if (currentStep === 'home') {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen py-8 px-4",
      style: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto max-w-6xl text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-8"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "text-4xl font-bold text-white mb-4"
    }, "\uD83D\uDCBC Business Strategy Generator"), /*#__PURE__*/React.createElement("p", {
      className: "text-xl text-white max-w-2xl mx-auto"
    }, "Generate professional SWOT analyses, Business Model Canvases, and 90-day roadmaps in minutes. Ideal for entrepreneurs and small business owners.")), /*#__PURE__*/React.createElement("div", {
      className: "grid md:grid-cols-3 gap-6 mb-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-blue-50 p-6 rounded-lg"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold text-blue-800 mb-2"
    }, "\uD83C\uDFAF SWOT Analysis"), /*#__PURE__*/React.createElement("p", {
      className: "text-blue-600"
    }, "Identify your strengths, weaknesses, opportunities, and threats")), /*#__PURE__*/React.createElement("div", {
      className: "bg-green-50 p-6 rounded-lg"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold text-green-800 mb-2"
    }, "\uD83D\uDCCA Business Model Canvas"), /*#__PURE__*/React.createElement("p", {
      className: "text-green-600"
    }, "Map out your complete business model on one page")), /*#__PURE__*/React.createElement("div", {
      className: "bg-purple-50 p-6 rounded-lg"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold text-purple-800 mb-2"
    }, "\uD83D\uDCC5 90-Day Roadmap"), /*#__PURE__*/React.createElement("p", {
      className: "text-purple-600"
    }, "Create actionable plans for your next quarter"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setCurrentStep('input');
        if (typeof gtag !== 'undefined') gtag('event', 'tool_used', {
          tool_name: 'Business Strategy Generator',
          action: 'start'
        });
      },
      className: "text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors",
      style: {
        background: '#fe2700'
      }
    }, "Start Strategy Generator \u2192"), /*#__PURE__*/React.createElement("div", {
      className: "mt-8 text-sm text-gray-500"
    }, /*#__PURE__*/React.createElement("p", null, "\u2705 No signup required \u2022 \u2705 Works offline \u2022 \u2705 Export to PDF/JSON"))));
  }

  // Render Input Form
  if (currentStep === 'input') {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen py-8 px-4",
      style: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto max-w-2xl"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-bold mb-6 text-white"
    }, "\uD83D\uDCDD Tell us about your business"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-6"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-lg font-medium text-white mb-2"
    }, "Business Name *"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "businessName",
      value: formData.businessName,
      onChange: handleInputChange,
      className: "w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "Enter your business name",
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-sm font-medium text-white mb-2"
    }, "Business Type"), /*#__PURE__*/React.createElement("select", {
      name: "businessType",
      value: formData.businessType,
      onChange: handleInputChange,
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    }, /*#__PURE__*/React.createElement("option", {
      value: "product"
    }, "Product"), /*#__PURE__*/React.createElement("option", {
      value: "service"
    }, "Service"), /*#__PURE__*/React.createElement("option", {
      value: "both"
    }, "Both Product & Service"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-sm font-medium text-white mb-2"
    }, "Industry *"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "industry",
      value: formData.industry,
      onChange: handleInputChange,
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "e.g., Technology, Healthcare, Retail",
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-sm font-medium text-white mb-2"
    }, "Target Market *"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "targetMarket",
      value: formData.targetMarket,
      onChange: handleInputChange,
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "e.g., Small businesses, Young professionals, Families",
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-sm font-medium text-white mb-2"
    }, "Top 3 Business Goals"), [0, 1, 2].map(i => /*#__PURE__*/React.createElement("input", {
      key: i,
      type: "text",
      value: formData.goals[i],
      onChange: e => handleGoalChange(i, e.target.value),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2",
      placeholder: `Goal ${i + 1} (optional)`
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-sm font-medium text-white mb-2"
    }, "Business Maturity Level"), /*#__PURE__*/React.createElement("select", {
      name: "maturityLevel",
      value: formData.maturityLevel,
      onChange: handleInputChange,
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    }, /*#__PURE__*/React.createElement("option", {
      value: "startup"
    }, "Startup (Idea/Early stage)"), /*#__PURE__*/React.createElement("option", {
      value: "early"
    }, "Early Stage (Some traction)"), /*#__PURE__*/React.createElement("option", {
      value: "established"
    }, "Established (Proven business)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "block text-sm font-medium text-white mb-2"
    }, "Problem Your Business Solves"), /*#__PURE__*/React.createElement("textarea", {
      name: "problemSolved",
      value: formData.problemSolved,
      onChange: handleInputChange,
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      rows: "3",
      placeholder: "Describe the main problem your business addresses"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between mt-8"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentStep('home'),
      className: "px-6 py-2 text-white border border-gray-300 rounded-lg hover:bg-gray-700"
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentStep('strategy'),
      disabled: !isFormValid(),
      className: `px-6 py-2 rounded-lg font-semibold ${isFormValid() ? 'text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`,
      style: isFormValid() ? {
        background: '#fe2700'
      } : {}
    }, "Continue \u2192"))));
  }

  // Render Loading State (checked before strategy so spinner shows when Generate is clicked)
  if (isGenerating) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen py-8 px-4 flex items-center justify-center",
      style: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"
    }), /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-bold text-white mb-2"
    }, "\uD83E\uDD16 Generating Your Strategy..."), /*#__PURE__*/React.createElement("p", {
      className: "text-white"
    }, "Analyzing your business data and creating personalized insights")));
  }

  // Render Strategy Selector
  if (currentStep === 'strategy') {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen py-8 px-4",
      style: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto max-w-2xl"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-bold mb-6 text-white"
    }, "\uD83C\uDFAF Choose Your Strategy Tool"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 mb-4 text-sm"
    }, "Select one or more frameworks to generate together."), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("label", {
      className: `block p-4 border-2 rounded-lg cursor-pointer transition-all ${strategyTypes.includes('SWOT') ? 'border-blue-500 bg-blue-900/30' : 'border-gray-500 bg-slate-800/50 hover:border-blue-400'}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: "SWOT",
      checked: strategyTypes.includes('SWOT'),
      onChange: () => toggleType('SWOT'),
      className: "sr-only"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold text-white"
    }, "\uD83C\uDFAF SWOT Analysis"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-300 mt-1"
    }, "Analyze your internal strengths & weaknesses plus external opportunities & threats")), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${strategyTypes.includes('SWOT') ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`
    }, strategyTypes.includes('SWOT') && /*#__PURE__*/React.createElement("span", {
      className: "text-white text-xs font-bold"
    }, "\u2713")))), /*#__PURE__*/React.createElement("label", {
      className: `block p-4 border-2 rounded-lg cursor-pointer transition-all ${strategyTypes.includes('BMC') ? 'border-blue-500 bg-blue-900/30' : 'border-gray-500 bg-slate-800/50 hover:border-blue-400'}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: "BMC",
      checked: strategyTypes.includes('BMC'),
      onChange: () => toggleType('BMC'),
      className: "sr-only"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold text-white"
    }, "\uD83D\uDCCA Business Model Canvas"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-300 mt-1"
    }, "Map out your complete business model across 9 key building blocks")), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${strategyTypes.includes('BMC') ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`
    }, strategyTypes.includes('BMC') && /*#__PURE__*/React.createElement("span", {
      className: "text-white text-xs font-bold"
    }, "\u2713")))), /*#__PURE__*/React.createElement("label", {
      className: `block p-4 border-2 rounded-lg cursor-pointer transition-all ${strategyTypes.includes('90Day') ? 'border-blue-500 bg-blue-900/30' : 'border-gray-500 bg-slate-800/50 hover:border-blue-400'}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: "90Day",
      checked: strategyTypes.includes('90Day'),
      onChange: () => toggleType('90Day'),
      className: "sr-only"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold text-white"
    }, "\uD83D\uDCC5 90-Day Roadmap"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-300 mt-1"
    }, "Create a detailed 3-month action plan with priorities and metrics")), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${strategyTypes.includes('90Day') ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`
    }, strategyTypes.includes('90Day') && /*#__PURE__*/React.createElement("span", {
      className: "text-white text-xs font-bold"
    }, "\u2713"))))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between mt-8"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentStep('input'),
      className: "px-6 py-2 text-white border border-gray-300 rounded-lg hover:bg-gray-700"
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
      onClick: generateStrategy,
      disabled: strategyTypes.length === 0,
      className: `px-6 py-2 rounded-lg font-semibold ${strategyTypes.length > 0 ? 'text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`,
      style: strategyTypes.length > 0 ? {
        background: '#fe2700'
      } : {}
    }, "Generate Strategy \u2192"))));
  }

  // Render Output
  if (currentStep === 'output' && output) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen py-8 px-4",
      style: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto max-w-4xl"
    }, output.SWOT && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-semibold mb-4 text-white"
    }, "\uD83C\uDFAF SWOT Analysis for ", formData.businessName), /*#__PURE__*/React.createElement("div", {
      className: "strategy-grid mb-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-green-50 border-2 border-green-200 rounded-lg p-4"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-green-800 mb-3"
    }, "\uD83D\uDCAA Strengths"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-2"
    }, output.SWOT.strengths.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-green-700 text-sm"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bg-red-50 border-2 border-red-200 rounded-lg p-4"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-red-800 mb-3"
    }, "\u26A0\uFE0F Weaknesses"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-2"
    }, output.SWOT.weaknesses.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-red-700 text-sm"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-4"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-blue-800 mb-3"
    }, "\uD83D\uDE80 Opportunities"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-2"
    }, output.SWOT.opportunities.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-blue-700 text-sm"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bg-orange-50 border-2 border-orange-200 rounded-lg p-4"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-orange-800 mb-3"
    }, "\u26A1 Threats"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-2"
    }, output.SWOT.threats.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-orange-700 text-sm"
    }, "\u2022 ", item)))))), output.BMC && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-semibold mb-4 text-white"
    }, "\uD83D\uDCCA Business Model Canvas for ", formData.businessName), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4 mb-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-5 gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Key Partnerships"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.keyPartnerships.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Key Activities"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.keyActivities.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Value Propositions"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.valuePropositions.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Customer Relationships"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.customerRelationships.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Customer Segments"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.customerSegments.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item))))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-2 gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Key Resources"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.keyResources.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Channels"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.channels.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item))))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-2 gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Cost Structure"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.costStructure.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item)))), /*#__PURE__*/React.createElement("div", {
      className: "bmc-section"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-white mb-2"
    }, "Revenue Streams"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, output.BMC.revenueStreams.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-white"
    }, "\u2022 ", item))))))), output['90Day'] && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-semibold mb-4 text-white"
    }, "\uD83D\uDCC5 90-Day Roadmap for ", formData.businessName), /*#__PURE__*/React.createElement("div", {
      className: "mb-8"
    }, Object.entries(output['90Day']).map(([month, data]) => /*#__PURE__*/React.createElement("div", {
      key: month,
      className: "roadmap-phase"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-lg font-bold text-blue-300 mb-2"
    }, month === 'month1' ? '📅 Month 1' : month === 'month2' ? '📅 Month 2' : '📅 Month 3', ": ", data.focus), /*#__PURE__*/React.createElement("div", {
      className: "grid md:grid-cols-2 gap-4"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
      className: "font-semibold text-white mb-2"
    }, "\uD83C\uDFAF Priorities"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, data.priorities.map((priority, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-gray-300"
    }, "\u2022 ", priority)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
      className: "font-semibold text-white mb-2"
    }, "\uD83D\uDCCA Success Metrics"), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-1"
    }, data.metrics.map((metric, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "text-sm text-gray-300"
    }, "\u2022 ", metric))))))))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-4 justify-center border-t pt-6"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentStep('strategy'),
      className: "px-4 py-2 text-white border border-gray-300 rounded-lg hover:bg-gray-700"
    }, "\u2190 Generate Another"), /*#__PURE__*/React.createElement("button", {
      onClick: copyToClipboard,
      className: "px-4 py-2 text-white rounded-lg",
      style: {
        background: '#fe2700'
      }
    }, "\uD83D\uDCCB Copy to Clipboard"), /*#__PURE__*/React.createElement("button", {
      onClick: () => window.print(),
      className: "px-4 py-2 text-white rounded-lg",
      style: {
        background: '#fe2700'
      }
    }, "Save or Print")), /*#__PURE__*/React.createElement("div", {
      className: "mt-8 text-center text-sm text-white"
    }, /*#__PURE__*/React.createElement("p", null, "\uD83C\uDF89 Strategy generated successfully! Share this tool with other entrepreneurs."), /*#__PURE__*/React.createElement("button", {
      onClick: () => window.openFeedbackWidget && window.openFeedbackWidget(),
      className: "mt-3 px-4 py-2 text-white rounded-lg border-0 cursor-pointer text-sm",
      style: {
        background: '#334155'
      }
    }, "Give Feedback"))));
  }
  return null;
};

// Render the app
const container = document.getElementById('root');
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), container);