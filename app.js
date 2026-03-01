// Debug logging

// Check if React and ReactDOM are loaded
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
  document.getElementById('root').innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Error: React libraries failed to load. Please check your internet connection and refresh the page.</div>';
} else {
  // Ensure website URL has scheme before submit (homepage consultation form)
  const normalizeWebsiteUrlHome = e => {
    try {
      const input = e.target.querySelector('#home_website');
      if (input && input.value && !/^https?:\/\//i.test(input.value)) {
        input.value = 'https://' + input.value.replace(/^\/+/, '');
      }
    } catch (err) {}
  };
  const NavBar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    return /*#__PURE__*/React.createElement("nav", {
      className: "bg-white shadow-lg sticky top-0 z-50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-4 transform hover:scale-105 transition-all duration-300"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("img", {
      src: "Logo/SC24.png",
      alt: "SummCore company logo",
      className: "h-20 filter drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300 transform hover:-translate-y-1",
      style: {
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))',
        transform: 'perspective(1000px) rotateX(5deg)'
      },
      loading: "lazy"
    })), /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-4xl font-bold tracking-tight transform hover:-translate-y-1 transition-all duration-300 flex items-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-800",
      style: {
        WebkitTextStroke: '0px transparent',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        fontWeight: 'bold',
        fontSize: '2.25rem',
        lineHeight: '1'
      }
    }, "S"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-800",
      style: {
        WebkitTextStroke: '1px #000',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
      }
    }, "umm"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-800",
      style: {
        WebkitTextStroke: '0px transparent',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        fontWeight: 'bold',
        fontSize: '2.25rem',
        lineHeight: '1'
      }
    }, "C"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-800",
      style: {
        WebkitTextStroke: '1px #000',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
      }
    }, "ore")), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 text-4xl font-bold text-gray-300 -z-10 flex items-center",
      style: {
        transform: 'translate(2px, 2px)',
        opacity: '0.6'
      }
    }, /*#__PURE__*/React.createElement("span", null, "S"), /*#__PURE__*/React.createElement("span", null, "umm"), /*#__PURE__*/React.createElement("span", null, "C"), /*#__PURE__*/React.createElement("span", null, "ore")))), /*#__PURE__*/React.createElement("div", {
      className: "hidden md:flex space-x-4 items-center"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#services",
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300"
    }, "Services"), /*#__PURE__*/React.createElement("a", {
      href: "#tools",
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300"
    }, "Free Tools"), /*#__PURE__*/React.createElement("div", {
      className: "relative group"
    }, /*#__PURE__*/React.createElement("button", {
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300 flex items-center gap-1 bg-transparent border-0 cursor-pointer text-base p-0 font-normal"
    }, "Our Ecosystem ", /*#__PURE__*/React.createElement("span", {
      className: "text-xs ml-1"
    }, "\u25BC")), /*#__PURE__*/React.createElement("div", {
      className: "absolute top-full right-0 mt-3 w-[500px] bg-white border border-gray-200 rounded-xl shadow-2xl p-3 flex flex-col gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
    }, /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      className: "flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors no-underline",
      style: {
        textDecoration: 'none',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-36 shrink-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-gray-800 font-semibold text-sm"
    }, "SummCore"), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-400 mt-0.5"
    }, "summcore.com")), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-500 leading-snug"
    }, "Free business tools, consulting services, and the SummCore blog with growth strategies for SMEs and startups.")), /*#__PURE__*/React.createElement("a", {
      href: "https://boost.summcore.com",
      target: "_blank",
      rel: "noopener",
      className: "flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors",
      style: {
        textDecoration: 'none',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-36 shrink-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-gray-800 font-semibold text-sm"
    }, "SummCore Boost"), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-400 mt-0.5"
    }, "boost.summcore.com")), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-500 leading-snug"
    }, "AI-powered business health assessments across five pillars with scored reports and recommendations.")), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-4 p-3 rounded-lg opacity-40 cursor-not-allowed select-none"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-36 shrink-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-gray-800 font-semibold text-sm"
    }, "SummCore Pro"), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-400 mt-0.5"
    }, "Coming soon")), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-500 leading-snug"
    }, "CAPM and PMP exam preparation platform with AI-generated practice questions and gamified progress tracking.")))), /*#__PURE__*/React.createElement("a", {
      href: "#consultation",
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300"
    }, "Consultation"), /*#__PURE__*/React.createElement("a", {
      href: "#contact",
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300"
    }, "Contact")), /*#__PURE__*/React.createElement("button", {
      className: "md:hidden p-2 rounded border border-gray-200 hover:bg-gray-100",
      onClick: () => setMobileOpen(o => !o),
      "aria-label": "Toggle navigation menu",
      "aria-expanded": mobileOpen
    }, /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 6h16M4 12h16M4 18h16",
      stroke: "#374151",
      strokeWidth: "2",
      strokeLinecap: "round"
    })))), mobileOpen && /*#__PURE__*/React.createElement("div", {
      className: "md:hidden bg-white border-t border-gray-200 shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-7xl mx-auto px-4 py-3 flex flex-col space-y-2"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#services",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Services"), /*#__PURE__*/React.createElement("a", {
      href: "#tools",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Free Tools"), /*#__PURE__*/React.createElement("div", {
      className: "py-1 border-t border-gray-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-400 uppercase tracking-wide py-1"
    }, "Our Ecosystem"), /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      className: "py-2 pl-3 text-gray-700 hover:text-amber-600 flex flex-col",
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, "SummCore"), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-gray-400"
    }, "summcore.com")), /*#__PURE__*/React.createElement("a", {
      href: "https://boost.summcore.com",
      target: "_blank",
      rel: "noopener",
      className: "py-2 pl-3 text-gray-700 hover:text-amber-600 flex flex-col",
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, "SummCore Boost"), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-gray-400"
    }, "boost.summcore.com")), /*#__PURE__*/React.createElement("div", {
      className: "py-2 pl-3 flex flex-col opacity-40 cursor-not-allowed"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-gray-700"
    }, "SummCore Pro"), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-gray-400"
    }, "Coming soon"))), /*#__PURE__*/React.createElement("a", {
      href: "#consultation",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Consultation"), /*#__PURE__*/React.createElement("a", {
      href: "#contact",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Contact"))));
  };
  const Hero = () => /*#__PURE__*/React.createElement("section", {
    className: "text-white py-20 relative overflow-hidden",
    style: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold mb-4"
  }, "Innovation Consulting and Growth Strategies for SMEs"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl md:text-3xl font-light text-amber-200 mb-2 relative",
    style: {
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      letterSpacing: '0.05em',
      fontFamily: 'Georgia, "Times New Roman", serif'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-100",
    style: {
      fontStyle: 'italic'
    }
  }, "\"Where "), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-block",
    style: {
      minWidth: '220px',
      height: '1.2em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent font-semibold",
    style: {
      animation: 'wordSwitch1 10s infinite ease-in-out',
      fontStyle: 'italic',
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: '0.02em'
    }
  }, "imagination"), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent font-semibold",
    style: {
      animation: 'wordSwitch2 10s infinite ease-in-out',
      fontStyle: 'italic',
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: '0.02em'
    }
  }, "possibility")), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-200 mx-2",
    style: {
      fontSize: '1.2em'
    }
  }, "\u2728"), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-100",
    style: {
      fontStyle: 'italic'
    }
  }, "meets "), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-block",
    style: {
      minWidth: '220px',
      height: '1.2em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent font-semibold",
    style: {
      animation: 'wordSwitch1 10s infinite ease-in-out',
      fontStyle: 'italic',
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: '0.02em'
    }
  }, "possibility"), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent font-semibold",
    style: {
      animation: 'wordSwitch2 10s infinite ease-in-out',
      fontStyle: 'italic',
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: '0.02em'
    }
  }, "imagination")), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-100",
    style: {
      fontStyle: 'italic'
    }
  }, "\"")), /*#__PURE__*/React.createElement("div", {
    className: "w-24 h-1 bg-amber-400 mx-auto rounded-full opacity-60"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-lg md:text-xl mb-8"
  }, "SummCore helps SMEs and startups unlock new ideas to boost revenue and engagement."), /*#__PURE__*/React.createElement("a", {
    href: "#consultation",
    className: "text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    style: {
      background: '#fe2700'
    }
  }, "Get in Touch")));
  const Services = () => /*#__PURE__*/React.createElement("section", {
    id: "services",
    className: "py-16 bg-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold text-white text-center mb-12"
  }, "What services does SummCore offer?"), /*#__PURE__*/React.createElement("div", {
    className: "pt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Idea Generation"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300"
  }, "Creative solutions tailored to your business needs and challenges.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Revenue Strategy"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300"
  }, "Custom strategies to optimize revenue streams and attract new customers.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Ongoing Support"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300"
  }, "Continuous engagement to refine and implement innovative ideas for growth.")))));
  const Pitch = () => /*#__PURE__*/React.createElement("section", {
    className: "py-16 text-white relative overflow-hidden",
    style: {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-4xl font-bold mb-6 text-amber-400"
  }, "Turn Ideas Into Measurable Growth, Starting Today"), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed"
  }, /*#__PURE__*/React.createElement("p", null, "I have spent years working inside businesses, finding exactly where growth stalls and why. Not theory. Real decisions, real results, real problems solved."), /*#__PURE__*/React.createElement("p", null, "SummCore is how I make that experience work directly for you. Start with the free tools. Take the Boost assessment when you want a real picture of where your business stands. Go further when you are ready."), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-200 font-semibold"
  }, "The gap between where you are and where you could be is usually smaller than it looks. It just needs someone who knows where to look."))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12 mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-amber-500/20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-6 text-amber-400"
  }, "How It Works"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4 text-lg"
  }, "Start with the ", /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-semibold"
  }, "free Boost assessment"), ". Twenty-six questions across five business pillars: Revenue, Marketing, Operations, Systems, and AI Readiness. Five minutes. You get a real health score that shows exactly where your business is performing and where it is losing ground."), /*#__PURE__*/React.createElement("p", {
    className: "mb-4 text-lg"
  }, "If you want the full picture, unlock the ", /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-semibold"
  }, "premium report for $35"), ". Built entirely from your answers, it goes beyond scoring. It identifies the specific growth opportunities and ideas relevant to your business, things that are easy to miss when you are in the middle of running it."), /*#__PURE__*/React.createElement("p", {
    className: "mb-4 text-lg"
  }, "Every premium report includes a ", /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-semibold"
  }, "personal 15-minute growth session"), " with me. We go through your results together, talk through the opportunities, and figure out your clearest next step."), /*#__PURE__*/React.createElement("p", {
    className: "text-lg"
  }, "For businesses that want to go further, whether that is a growth strategy, fixing operational drag, or finding new revenue angles.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-amber-500/20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-6 text-amber-400"
  }, "What You Get"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4 text-lg"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 mr-3"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "A free health score across five pillars, no sign-up required to start")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 mr-3"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "A ", /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-semibold"
  }, "$35 premium report"), " with AI-powered analysis built from your specific answers, not a generic template")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 mr-3"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Growth opportunities and ideas surfaced from your data, not just what is wrong, but what is possible")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 mr-3"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "A ", /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-semibold"
  }, "personal 15-minute session"), " included with every premium report")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 mr-3"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Direct access to deeper consultancy if you want to move fast"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg mb-4 text-gray-300"
  }, "Most businesses know something is not working. Fewer know what to do about it. That is what this is for."), /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "inline-block text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform",
    style: {
      background: '#fe2700'
    }
  }, "Start Your Free Assessment"))))));
  const Tools = () => /*#__PURE__*/React.createElement("section", {
    id: "tools",
    className: "py-16 bg-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold text-white text-center mb-12"
  }, "What free tools does SummCore offer?"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Business Health Check"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 mb-4"
  }, "Comprehensive assessment tool to evaluate your business performance and identify growth opportunities."), /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-md",
    style: {
      background: '#fe2700'
    }
  }, "Start Free Check"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-2"
  }, "Free limited check available. Full reports on ", /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "text-amber-500 hover:underline"
  }, "SummCore Boost"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Business Strategy Generator"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 mb-4"
  }, "Generate smart strategies tailored to your business objectives."), /*#__PURE__*/React.createElement("a", {
    href: "Business%20Strategy%20Generator/smart-business-strategy-generator.html",
    className: "inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-md",
    style: {
      background: '#fe2700'
    }
  }, "Launch Tool")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Free Financial Health Checker"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 mb-4"
  }, "Analyze your financial health and identify areas for improvement."), /*#__PURE__*/React.createElement("a", {
    href: "Free%20Financial%20Health%20Checker/financial-calculator.html",
    className: "inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-md",
    style: {
      background: '#fe2700'
    }
  }, "Launch Tool")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Invoicing & Quotation"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 mb-4"
  }, "Create professional invoices and quotations quickly."), /*#__PURE__*/React.createElement("a", {
    href: "Invoicing%20%26%20Quotation/index.html",
    className: "inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-md",
    style: {
      background: '#fe2700'
    }
  }, "Launch Tool")), /*#__PURE__*/React.createElement("div", {
    className: "tool-card bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Revenue Checker"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 mb-4"
  }, "Estimate potential revenue from new initiatives with our easy-to-use tool."), /*#__PURE__*/React.createElement("a", {
    href: "Revenue%20Calculator/index.html",
    className: "inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-md",
    style: {
      background: '#fe2700'
    }
  }, "Launch Tool")))));
  const Footer = () => /*#__PURE__*/React.createElement("footer", {
    id: "contact",
    className: "bg-slate-900 text-white py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:justify-self-start"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-4"
  }, "SummCore"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400"
  }, "Empowering SMEs and startups with innovative solutions for growth.")), /*#__PURE__*/React.createElement("div", {
    className: "md:justify-self-center text-center md:text-left"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-4"
  }, "Quick Links"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#services",
    className: "text-gray-400 footer-link"
  }, "Services")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#tools",
    className: "text-gray-400 footer-link"
  }, "Free Tools")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#consultation",
    className: "text-gray-400 footer-link"
  }, "Consultation")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "about.html",
    className: "text-gray-400 footer-link"
  }, "About")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "privacy.html",
    className: "text-gray-400 footer-link"
  }, "Privacy Policy")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "terms.html",
    className: "text-gray-400 footer-link"
  }, "Terms of Service")))), /*#__PURE__*/React.createElement("div", {
    className: "md:justify-self-end text-left"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-4"
  }, "Contact Us"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400"
  }, "Email:"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@summcore.com",
    className: "text-gray-400 footer-link"
  }, "info@summcore.com")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:support@summcore.com",
    className: "text-gray-400 footer-link"
  }, "support@summcore.com")), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400"
  }, "DM us through Social Media"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-col items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 text-gray-400"
  }, /*#__PURE__*/React.createElement("span", null, "Follow us on:"), /*#__PURE__*/React.createElement("a", {
    href: "https://x.com/SummCoreIdeas",
    target: "_blank",
    rel: "noopener",
    "aria-label": "SummCore on X (Twitter)"
  }, /*#__PURE__*/React.createElement("img", {
    className: "social-icon",
    src: "Logo/Social Media/XAI.svg?v=2",
    alt: "SummCore on X (Twitter)",
    width: "36",
    height: "36",
    style: {
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)'
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/summcoreideas/",
    target: "_blank",
    rel: "noopener",
    "aria-label": "SummCore on Instagram"
  }, /*#__PURE__*/React.createElement("img", {
    className: "social-icon",
    src: "Logo/Social Media/Instagram.png",
    alt: "SummCore on Instagram",
    width: "36",
    height: "36",
    style: {
      objectFit: 'contain'
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.tiktok.com/@summcore?is_from_webapp=1&sender_device=pc",
    target: "_blank",
    rel: "noopener",
    "aria-label": "SummCore on TikTok"
  }, /*#__PURE__*/React.createElement("img", {
    className: "social-icon",
    src: "Logo/Social Media/tiktok.webp",
    alt: "SummCore on TikTok",
    width: "36",
    height: "36",
    style: {
      objectFit: 'contain'
    },
    loading: "lazy"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 text-center text-gray-400"
  }, "\xA9 2026 SummCore. All rights reserved.")));
  const Consultation = () => /*#__PURE__*/React.createElement("section", {
    id: "consultation",
    className: "py-16 text-white relative overflow-hidden",
    style: {
      background: 'linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 pointer-events-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-16 left-1/3 w-6 h-6 bg-amber-400 cog opacity-80",
    style: {
      animation: 'cogRotateClockwise 10s linear infinite'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold mb-4"
  }, "Want to Go Further?"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg mb-8"
  }, "Start with the free ", /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "text-amber-400 hover:underline font-semibold"
  }, "Boost assessment"), ", or get in touch directly if you want to talk strategy, fix something specific, or move fast."), /*#__PURE__*/React.createElement("form", {
    action: "send.php",
    method: "POST",
    className: "max-w-md mx-auto space-y-3 text-left",
    onSubmit: normalizeWebsiteUrlHome
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "home_business_name",
    name: "business_name",
    placeholder: "Business Name",
    required: true,
    className: "w-full p-3 rounded-md text-gray-800"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "home_website",
    name: "website",
    placeholder: "www.yourwebsite.com (Optional)",
    className: "w-full p-3 rounded-md text-gray-800"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "home_your_name",
    name: "your_name",
    placeholder: "Your Name",
    required: true,
    className: "w-full p-3 rounded-md text-gray-800"
  }), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    id: "home_phone",
    name: "phone",
    placeholder: "Phone Number (Optional)",
    className: "w-full p-3 rounded-md text-gray-800"
  }), /*#__PURE__*/React.createElement("input", {
    type: "email",
    id: "home_email",
    name: "email",
    placeholder: "Email",
    required: true,
    className: "w-full p-3 rounded-md text-gray-800"
  }), /*#__PURE__*/React.createElement("textarea", {
    id: "home_needs",
    name: "needs",
    rows: "5",
    placeholder: "Briefly Describe Your Needs",
    required: true,
    className: "w-full p-3 rounded-md text-gray-800"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300",
    style: {
      background: '#fe2700'
    }
  }, "Schedule Now"))));
  const FAQ = () => {
    const faqs = [{
      q: "What is SummCore?",
      a: "SummCore is an innovation consulting firm that helps SMEs and startups grow through strategy frameworks, free business tools, and one-to-one expert consultation."
    }, {
      q: "Are the business tools free to use?",
      a: "Most SummCore tools are completely free with no sign-up required, including the Strategy Generator, Financial Health Checker, Revenue Forecasting Tool, and Invoicing and Quotation App. The Business Health Check offers a free limited assessment via SummCore Boost, with full scored reports available on a paid plan."
    }, {
      q: "Who is SummCore for?",
      a: "SummCore is designed for small and medium-sized enterprises (SMEs) and startups looking for practical growth strategies, business planning tools, and expert innovation consulting."
    }, {
      q: "How do I work with SummCore?",
      a: "Start with the free tools or take the Business Health Check on SummCore Boost. When you are ready to go further, use the contact form to get in touch and a SummCore consultant will follow up with you."
    }, {
      q: "What services does SummCore offer?",
      a: "SummCore offers innovation consulting, growth strategy development, process improvement, product development guidance, and a suite of free business tools covering health checks, strategy generation, financial analysis, revenue forecasting, and invoicing."
    }];
    const [open, setOpen] = React.useState(null);
    return /*#__PURE__*/React.createElement("section", {
      id: "faq",
      className: "py-16 bg-slate-800"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-3xl font-bold text-center text-white mb-10"
    }, "Frequently Asked Questions"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, faqs.map((item, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "bg-slate-700 rounded-lg border border-slate-600"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(open === i ? null : i),
      className: "w-full text-left px-6 py-4 flex justify-between items-center text-white font-semibold hover:text-amber-400 transition-colors"
    }, /*#__PURE__*/React.createElement("span", null, item.q), /*#__PURE__*/React.createElement("span", {
      className: "text-xl ml-4",
      style: {
        transform: open === i ? 'rotate(45deg)' : 'none',
        transition: 'transform 0.2s'
      }
    }, "+")), open === i && /*#__PURE__*/React.createElement("div", {
      className: "px-6 pb-4 text-gray-300"
    }, item.a))))));
  };
  const App = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Pitch, null), /*#__PURE__*/React.createElement(Tools, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(Consultation, null), /*#__PURE__*/React.createElement(Footer, null));

  // Use React 18 createRoot API if available, otherwise fallback to legacy render

  try {
    if (ReactDOM.createRoot) {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(/*#__PURE__*/React.createElement(App, null));
    } else {
      ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
    }
  } catch (error) {
    document.getElementById('root').innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Something went wrong. Please refresh the page.</div>';
  }
}

// Handle anchor navigation from external pages
window.addEventListener('load', function () {
  if (window.location.hash) {
    setTimeout(function () {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }
});