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

  // Sage demo line + booking link — single source of truth.
  // Fill these in and recompile (node compile.mjs); the demo strip and
  // "Talk to Sage" tel: links stay hidden until SAGE_NUMBER is set.
  const SAGE_NUMBER = '+442922715325'; // Sage's Cardiff demo line (Vapi)
  const SAGE_NUMBER_DISPLAY = '029 2271 5325';
  const CAL_LINK = ''; // e.g. 'summcore/15min' — Cal.com booking link (username/event)

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
      src: "Logo/SC23.png?v=2",
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
      href: "#pricing",
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300"
    }, "Pricing"), /*#__PURE__*/React.createElement("a", {
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
    }, "AI-powered business health assessments across five pillars with scored reports and recommendations.")))), /*#__PURE__*/React.createElement("a", {
      href: "blog/index.html",
      className: "text-gray-700 hover:text-amber-600 transition-colors duration-300"
    }, "Blog"), /*#__PURE__*/React.createElement("a", {
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
      href: "#pricing",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Pricing"), /*#__PURE__*/React.createElement("a", {
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
    }, "boost.summcore.com"))), /*#__PURE__*/React.createElement("a", {
      href: "blog/index.html",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Blog"), /*#__PURE__*/React.createElement("a", {
      href: "#consultation",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Consultation"), /*#__PURE__*/React.createElement("a", {
      href: "#contact",
      className: "py-2 text-gray-700 hover:text-amber-600"
    }, "Contact"))));
  };

  // Rotating hero phrases — pairs switch together (wordRotate1/2/3 keyframes in index.html)
  const HERO_ROTATE_A = ['on the job', 'on site', 'with a customer'];
  const HERO_ROTATE_B = ['answering', 'booking', 'following up'];
  const RotatingWords = ({
    words,
    minWidth
  }) => /*#__PURE__*/React.createElement("span", {
    className: "relative inline-block align-baseline",
    style: {
      minWidth,
      height: '1.2em'
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent font-semibold",
    style: {
      animation: `wordRotate${i + 1} 12s infinite ease-in-out`,
      fontStyle: 'italic',
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: '0.02em'
    }
  }, w)));
  const Hero = () => /*#__PURE__*/React.createElement("section", {
    className: "text-white py-20 relative overflow-hidden",
    style: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold mb-4"
  }, "Never lose another job to a missed call."), /*#__PURE__*/React.createElement("div", {
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
  }, "While you're "), /*#__PURE__*/React.createElement(RotatingWords, {
    words: HERO_ROTATE_A,
    minWidth: "240px"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-100",
    style: {
      fontStyle: 'italic'
    }
  }, " \u2026 Sage is "), /*#__PURE__*/React.createElement(RotatingWords, {
    words: HERO_ROTATE_B,
    minWidth: "200px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-24 h-1 bg-amber-400 mx-auto rounded-full opacity-60"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-lg md:text-xl mb-8 max-w-3xl mx-auto"
  }, "SummCore builds AI systems that answer, book, chase and follow up for local businesses, starting from \xA3199 a month. Hear it live before you spend a penny."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center items-center"
  }, SAGE_NUMBER ? /*#__PURE__*/React.createElement("a", {
    href: `tel:${SAGE_NUMBER}`,
    onClick: () => window.gtag && window.gtag('event', 'call_sage_click', {
      event_category: 'demo',
      event_label: 'hero'
    }),
    className: "text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    style: {
      background: '#fe2700'
    }
  }, "\uD83C\uDF99 Talk to Sage") : /*#__PURE__*/React.createElement("a", {
    href: "#consultation",
    className: "text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    style: {
      background: '#fe2700'
    }
  }, "Book a free 15-min call"), /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-slate-900"
  }, "Start the \xA329 Boost")), SAGE_NUMBER && /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-gray-300"
  }, "Or ring Sage directly: ", /*#__PURE__*/React.createElement("a", {
    href: `tel:${SAGE_NUMBER}`,
    className: "text-amber-300 font-semibold hover:underline"
  }, SAGE_NUMBER_DISPLAY || SAGE_NUMBER))));

  // Live demo strip — hidden until SAGE_NUMBER is set
  const DemoStrip = () => {
    const [copied, setCopied] = React.useState(false);
    if (!SAGE_NUMBER) return null;
    const copyNumber = () => {
      try {
        navigator.clipboard.writeText(SAGE_NUMBER_DISPLAY || SAGE_NUMBER).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      } catch (err) {}
    };
    return /*#__PURE__*/React.createElement("section", {
      id: "demo",
      className: "py-10 text-white",
      style: {
        background: '#0b1220',
        borderTop: '1px solid rgba(254,39,0,0.4)',
        borderBottom: '1px solid rgba(254,39,0,0.4)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xl md:text-2xl font-semibold mb-2"
    }, "Don't take our word for it. Call Sage right now."), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 mb-6"
    }, "If you'd have known it was AI, tell us."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col sm:flex-row gap-4 justify-center items-center"
    }, /*#__PURE__*/React.createElement("a", {
      href: `tel:${SAGE_NUMBER}`,
      onClick: () => window.gtag && window.gtag('event', 'call_sage_click', {
        event_category: 'demo',
        event_label: 'demo_strip'
      }),
      className: "text-white px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      style: {
        background: '#fe2700'
      }
    }, "\uD83D\uDCDE ", SAGE_NUMBER_DISPLAY || SAGE_NUMBER), /*#__PURE__*/React.createElement("button", {
      onClick: copyNumber,
      className: "px-6 py-3 rounded-full font-semibold border border-gray-500 text-gray-300 hover:border-amber-400 hover:text-amber-300 transition-colors duration-300 bg-transparent cursor-pointer"
    }, copied ? 'Copied ✓' : 'Copy number'))));
  };
  const Services = () => {
    const services = [{
      icon: "💬",
      color: "#f59e0b",
      title: "Quote Follow-Up",
      desc: "You have already done the hard part and sent the quote. We chase it with friendly, automatic nudges, so the quiet ones turn into booked work."
    }, {
      icon: "💷",
      color: "#10b981",
      title: "Invoice Chasing",
      desc: "Stop spending your evenings chasing money. We follow up overdue invoices politely and persistently, in your name, so you get paid without the awkward calls."
    }, {
      icon: "🎨",
      color: "#8b5cf6",
      title: "Web Design & App Development",
      desc: "Need a site that actually sells, or an app built from scratch? We design and build it properly, and you own it outright."
    }, {
      icon: "🚀",
      color: "#0ea5e9",
      title: "Growth Strategy & Consulting",
      desc: "Years spent finding where growth stalls inside real businesses. We pinpoint what is holding you back and map the clearest way forward."
    }];
    return /*#__PURE__*/React.createElement("section", {
      id: "services",
      className: "py-16 bg-slate-800"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-3xl md:text-4xl font-bold text-white text-center mb-3"
    }, "What services does SummCore offer?"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 text-center max-w-2xl mx-auto mb-10"
    }, "From AI that answers your phone to the website that wins the customer, here is what we build and run for you. No job too small, no idea too odd."), /*#__PURE__*/React.createElement("div", {
      className: "relative mb-8 rounded-2xl p-8 md:p-10 overflow-hidden",
      style: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid rgba(254,39,0,0.4)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-4",
      style: {
        background: '#fe2700',
        color: '#fff'
      }
    }, "Flagship Service"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col md:flex-row md:items-center gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center rounded-2xl shrink-0",
      style: {
        width: '72px',
        height: '72px',
        background: 'rgba(254,39,0,0.15)',
        fontSize: '36px'
      }
    }, "\uD83D\uDCDE"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-2xl font-bold text-white mb-2"
    }, "AI Receptionist & Missed-Call Recovery"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-300 text-lg"
    }, "Never lose another lead to a ringing phone. We set up instant text-back and an AI receptionist that answers, books the job and texts you the summary, day or night. Most local businesses miss nearly half their calls. We make sure yours get answered.")))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-2 gap-6"
    }, services.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "group bg-slate-700 rounded-2xl border border-slate-600 hover:border-amber-500 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: '4px',
        background: s.color
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center rounded-xl mb-4",
      style: {
        width: '52px',
        height: '52px',
        background: s.color + '26',
        fontSize: '26px'
      }
    }, s.icon), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-semibold text-white mb-3"
    }, s.title), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-300"
    }, s.desc)))))));
  };
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
  }, /*#__PURE__*/React.createElement("p", null, "I have spent years working inside businesses, finding exactly where growth stalls and why. None of it is theory. It comes from decisions made with real money on the line."), /*#__PURE__*/React.createElement("p", null, "SummCore is how I make that experience work directly for you. Start with the free tools. Take the Boost assessment when you want a real picture of where your business stands. Go further when you are ready."), /*#__PURE__*/React.createElement("p", {
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
  }, "premium report for \xA329"), ". Built entirely from your answers, it goes beyond scoring. It identifies the specific growth opportunities and ideas relevant to your business, things that are easy to miss when you are in the middle of running it."), /*#__PURE__*/React.createElement("p", {
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
  }, "\xA329 premium report"), " with AI-powered analysis built from your specific answers, not a generic template")), /*#__PURE__*/React.createElement("li", {
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
  const Pricing = () => {
    const tiers = [{
      name: "Rescue",
      price: "£199",
      color: "#f59e0b",
      tagline: "Stop the leak",
      features: ["Sage AI receptionist + missed-call text-back"],
      highlight: false
    }, {
      name: "Grow",
      price: "£349",
      color: "#fe2700",
      tagline: "Answers the phone and chases the money",
      features: ["Sage AI receptionist + missed-call text-back", "Automated Google review requests", "Quote follow-up automation"],
      highlight: true
    }, {
      name: "Dominate",
      price: "£499",
      color: "#0ea5e9",
      tagline: "Run the whole front desk",
      features: ["Sage AI receptionist + missed-call text-back", "Automated Google review requests", "Quote follow-up automation", "AI website chat widget", "Monthly performance report", "Reactivation campaign (1 per quarter)"],
      highlight: false
    }];
    return /*#__PURE__*/React.createElement("section", {
      id: "pricing",
      className: "py-16 bg-slate-900"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-3xl md:text-4xl font-bold text-white text-center mb-3"
    }, "Simple monthly pricing"), /*#__PURE__*/React.createElement("p", {
      className: "text-amber-300 text-center text-lg font-semibold mb-2"
    }, "One missed \xA3800 job pays for six months."), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 text-center max-w-2xl mx-auto mb-10"
    }, "Every plan includes setup (\xA3299\u2013\xA3499 one-off) with no long contract. Call Sage first and judge it for yourself."), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch"
    }, tiers.map((t, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `relative flex flex-col rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.highlight ? 'bg-slate-800 border-2' : 'bg-slate-800/60 border-slate-600'}`,
      style: t.highlight ? {
        borderColor: '#fe2700'
      } : {}
    }, t.highlight && /*#__PURE__*/React.createElement("span", {
      className: "absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full",
      style: {
        background: '#fe2700',
        color: '#fff'
      }
    }, "Most popular"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '4px',
        background: t.color
      },
      className: "rounded-full mb-6"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "text-2xl font-bold text-white mb-1"
    }, t.name), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 text-sm mb-4"
    }, t.tagline), /*#__PURE__*/React.createElement("div", {
      className: "mb-6"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-4xl font-bold text-white"
    }, t.price), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-400"
    }, "/month")), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-3 mb-8 flex-grow"
    }, t.features.map((f, j) => /*#__PURE__*/React.createElement("li", {
      key: j,
      className: "flex items-start text-gray-300"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400 mr-3 shrink-0"
    }, "\u2713"), /*#__PURE__*/React.createElement("span", null, f)))), SAGE_NUMBER ? /*#__PURE__*/React.createElement("a", {
      href: `tel:${SAGE_NUMBER}`,
      onClick: () => window.gtag && window.gtag('event', 'call_sage_click', {
        event_category: 'demo',
        event_label: `pricing_${t.name.toLowerCase()}`
      }),
      className: "block text-center text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg",
      style: {
        background: t.highlight ? '#fe2700' : '#334155'
      }
    }, "\uD83C\uDF99 Talk to Sage") : /*#__PURE__*/React.createElement("a", {
      href: "#consultation",
      className: "block text-center text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg",
      style: {
        background: t.highlight ? '#fe2700' : '#334155'
      }
    }, "Book a free call")))), /*#__PURE__*/React.createElement("div", {
      className: "mt-10 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 mb-3"
    }, "One-offs also available: database reactivation campaign \xA3350\u2013\xA3500 \xB7 Google Business Profile optimisation \xA3149\u2013\xA3199 \xB7 conversion site rebuild \xA3500\u2013\xA3750."), /*#__PURE__*/React.createElement("p", {
      className: "text-lg text-gray-300"
    }, "Not sure where to start? ", /*#__PURE__*/React.createElement("a", {
      href: "https://boost.summcore.com",
      className: "text-amber-400 font-semibold hover:underline"
    }, "Take the \xA329 Boost.")))));
  };
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
    className: "bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border hover:border-amber-500 transition-colors duration-300",
    style: {
      borderColor: 'rgba(254,39,0,0.5)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-4"
  }, "Missed-Call Cost Calculator"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 mb-4"
  }, "How much is your unanswered phone really costing you? Three numbers, ten seconds, and the answer in pounds."), /*#__PURE__*/React.createElement("a", {
    href: "tools/missed-call-calculator/",
    className: "inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-md",
    style: {
      background: '#fe2700'
    }
  }, "Calculate My Losses")), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("img", {
    src: "Logo/SC31.png",
    alt: "SummCore",
    width: "60",
    height: "60",
    style: {
      objectFit: 'contain'
    },
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-4"
  }, "SummCore"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400"
  }, "We build AI systems and practical tools that help local businesses win more work.")), /*#__PURE__*/React.createElement("div", {
    className: "md:justify-self-center text-center md:text-left"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-4"
  }, "Quick Links"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#services",
    className: "text-gray-400 footer-link"
  }, "Services")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    className: "text-gray-400 footer-link"
  }, "Pricing")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#tools",
    className: "text-gray-400 footer-link"
  }, "Free Tools")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "text-gray-400 footer-link"
  }, "Business Health Check")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "blog/index.html",
    className: "text-gray-400 footer-link"
  }, "Blog")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
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
  }, /*#__PURE__*/React.createElement("span", null, "Follow us:"), /*#__PURE__*/React.createElement("a", {
    href: "https://x.com/SummCoreIdeas",
    target: "_blank",
    rel: "noopener",
    "aria-label": "SummCore on X (Twitter)"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "36",
    viewBox: "0 0 24 24",
    fill: "white",
    className: "social-icon",
    "aria-label": "SummCore on X (Twitter)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  }))), /*#__PURE__*/React.createElement("a", {
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
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/@SummCore",
    target: "_blank",
    rel: "noopener",
    "aria-label": "SummCore on YouTube"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "36",
    viewBox: "0 0 24 24",
    fill: "white",
    className: "social-icon",
    "aria-label": "SummCore on YouTube"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 pt-6 border-t border-white/10 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 mb-2"
  }, "Free assessment"), /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "inline-block text-lg font-semibold text-white footer-link",
    title: "Free Business Health Check from SummCore Boost"
  }, "Get your free Business Health Check \u2192"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 mt-2"
  }, "Score your business across five pillars in about five minutes.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 text-center text-gray-400 text-sm"
  }, "Something custom? ", /*#__PURE__*/React.createElement("a", {
    href: "index.html#consultation",
    className: "text-amber-400 footer-link"
  }, "Ask.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 text-center text-gray-400"
  }, "\xA9 2026 SummCore. All rights reserved.")));

  // Cal.com inline embed — official loader, renders into #cal-inline
  const CalEmbed = () => {
    React.useEffect(() => {
      (function (C, A, L) {
        let p = function (a, ar) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      window.Cal("init", {
        origin: "https://cal.com"
      });
      window.Cal("inline", {
        elementOrSelector: "#cal-inline",
        calLink: CAL_LINK,
        layout: "month_view"
      });
      window.Cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false
      });
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      id: "cal-inline",
      className: "max-w-4xl mx-auto rounded-xl overflow-hidden",
      style: {
        minHeight: '620px',
        width: '100%'
      }
    });
  };
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
  }, "Start with the ", /*#__PURE__*/React.createElement("a", {
    href: "https://boost.summcore.com",
    className: "text-amber-400 hover:underline font-semibold"
  }, "\xA329 Boost assessment"), ", or book a free 15-minute call about whatever is holding your business up."), CAL_LINK ? /*#__PURE__*/React.createElement(CalEmbed, null) : /*#__PURE__*/React.createElement("form", {
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
      a: "SummCore builds and runs AI systems for local businesses. Our main service is Sage, an AI receptionist that answers your calls, books jobs and texts you the summary. We also offer free business tools and hands-on growth consulting."
    }, {
      q: "Are the business tools free to use?",
      a: "Most SummCore tools are completely free with no sign-up required, including the Strategy Generator, Financial Health Checker, Revenue Forecasting Tool, and Invoicing and Quotation App. The Business Health Check offers a free limited assessment via SummCore Boost, with full scored reports available on a paid plan."
    }, {
      q: "Who is SummCore for?",
      a: "SummCore is built for local service businesses like trades, salons and clinics, and for any small business that wants its phone answered and its follow-up handled. The free tools work for any business owner."
    }, {
      q: "How do I work with SummCore?",
      a: "Start with the free tools or take the Business Health Check on SummCore Boost. When you are ready to go further, use the contact form to get in touch and a SummCore consultant will follow up with you."
    }, {
      q: "What services does SummCore offer?",
      a: "Our main service is the Sage AI receptionist with missed-call text-back, from £199 a month. On higher plans we add quote follow-up, Google review requests, a website chat widget and reactivation campaigns. We also build websites and apps, offer growth consulting, and all our online tools are free to use."
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
  const App = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(DemoStrip, null), /*#__PURE__*/React.createElement(Pitch, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(Tools, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(Consultation, null), /*#__PURE__*/React.createElement(Footer, null));

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