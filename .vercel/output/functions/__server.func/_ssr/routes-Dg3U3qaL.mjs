import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ScanSearch, c as Cpu, d as Activity, i as Send, l as Brain, n as ThumbsUp, o as Mic, r as ThumbsDown, s as MicOff, u as AudioLines } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dg3U3qaL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var DOTS = [
	{
		x: 8,
		y: 18,
		d: 9
	},
	{
		x: 92,
		y: 22,
		d: 11
	},
	{
		x: 14,
		y: 72,
		d: 8
	},
	{
		x: 86,
		y: 68,
		d: 10
	},
	{
		x: 48,
		y: 6,
		d: 12
	},
	{
		x: 52,
		y: 94,
		d: 9
	},
	{
		x: 6,
		y: 46,
		d: 13
	},
	{
		x: 94,
		y: 48,
		d: 8
	},
	{
		x: 22,
		y: 12,
		d: 14
	},
	{
		x: 78,
		y: 14,
		d: 10
	},
	{
		x: 28,
		y: 88,
		d: 11
	},
	{
		x: 74,
		y: 86,
		d: 13
	}
];
function HoloAvatar({ phase }) {
	const stageRef = (0, import_react.useRef)(null);
	const pupilRef = (0, import_react.useRef)(null);
	const speaking = phase === "speaking";
	const listening = phase === "listening";
	const thinking = phase === "thinking";
	(0, import_react.useEffect)(() => {
		const stage = stageRef.current;
		if (!stage) return;
		const onMove = (e) => {
			const r = stage.getBoundingClientRect();
			const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
			const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
			const x = Math.max(-3.2, Math.min(3.2, dx * 8));
			const y = Math.max(-2.2, Math.min(2.2, dy * 6));
			if (pupilRef.current) pupilRef.current.style.transform = `translate(${x}px, ${y}px)`;
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: stageRef,
		className: "relative mx-auto aspect-square w-full max-w-[min(280px,34vh)] lg:max-w-[min(400px,48vh)]",
		children: [
			DOTS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute size-1 rounded-full bg-nova-primary",
				style: {
					left: `${p.x}%`,
					top: `${p.y}%`,
					animation: `float-dot ${p.d * .28}s ease-in-out ${i * .18}s infinite`,
					boxShadow: "0 0 8px var(--color-nova-primary)"
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[4%] rounded-full border border-nova-primary/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "orbit pointer-events-none absolute inset-[2%]",
				viewBox: "0 0 100 100",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: "48",
					stroke: "currentColor",
					className: "text-nova-primary/40",
					strokeWidth: "0.4",
					strokeDasharray: "2 5"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "orbit-rev pointer-events-none absolute inset-[8%]",
				viewBox: "0 0 100 100",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: "48",
					stroke: "currentColor",
					className: "text-nova-accent/50",
					strokeWidth: "0.35",
					strokeDasharray: "1 7"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: cn("pointer-events-none absolute inset-[14%]", thinking ? "orbit-fast" : "orbit"),
				viewBox: "0 0 100 100",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: "48",
					stroke: "currentColor",
					className: "text-nova-primary/30",
					strokeWidth: "0.3",
					strokeDasharray: "12 8 2 8"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-beam" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 200 240",
				className: "holo-flicker relative z-10 h-full w-full drop-shadow-[0_0_18px_rgba(0,212,255,0.35)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
							id: "nova-glow",
							x: "-40%",
							y: "-40%",
							width: "180%",
							height: "180%",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
								stdDeviation: "2.4",
								result: "b"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "b" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "plate",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#00d4ff",
									stopOpacity: "0.16"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "55%",
									stopColor: "#0a1a36",
									stopOpacity: "0.55"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#00d4ff",
									stopOpacity: "0.1"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
							id: "core",
							cx: "50%",
							cy: "50%",
							r: "50%",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#e6f4ff"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "45%",
									stopColor: "#00d4ff"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#00d4ff",
									stopOpacity: "0"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M38 198 L22 228 H178 L162 198",
						fill: "url(#plate)",
						stroke: "#00d4ff",
						strokeWidth: "1.4",
						filter: "url(#nova-glow)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M48 198 L40 216 H160 L152 198",
						fill: "none",
						stroke: "#7c8cf8",
						strokeWidth: "0.6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "86",
						y: "168",
						width: "28",
						height: "18",
						rx: "3",
						fill: "url(#plate)",
						stroke: "#00d4ff",
						strokeWidth: "1.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M90 174 H110 M90 180 H110",
						stroke: "#00d4ff",
						strokeOpacity: "0.5",
						strokeWidth: "0.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M100 18 L148 38 L162 92 L148 148 L100 168 L52 148 L38 92 L52 38 Z",
						fill: "url(#plate)",
						stroke: "#00d4ff",
						strokeWidth: "1.6",
						filter: "url(#nova-glow)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M100 28 L140 44 L152 90 L140 138 L100 156 L60 138 L48 90 L60 44 Z",
						fill: "none",
						stroke: "#7c8cf8",
						strokeWidth: "0.7",
						strokeDasharray: "6 4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M100 18 L100 6 L108 14 L100 18 L92 14 Z",
						fill: "#00d4ff",
						opacity: "0.85",
						filter: "url(#nova-glow)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M38 84 L22 90 L22 108 L38 114",
						fill: "none",
						stroke: "#00d4ff",
						strokeWidth: "1.3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M162 84 L178 90 L178 108 L162 114",
						fill: "none",
						stroke: "#00d4ff",
						strokeWidth: "1.3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M26 96 H34 M26 102 H34 M166 96 H174 M166 102 H174",
						stroke: "#00d4ff",
						strokeWidth: "0.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M58 82 H142 L136 112 H64 Z",
						fill: listening ? "rgba(0,212,255,0.28)" : "rgba(0,212,255,0.14)",
						stroke: "#00d4ff",
						strokeWidth: "1.3",
						filter: "url(#nova-glow)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						ref: pupilRef,
						className: "eye-pulse",
						style: { transformOrigin: "100px 96px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "80",
								cy: "96",
								rx: listening ? 8 : 7,
								ry: listening ? 5.5 : 4.5,
								fill: "#00d4ff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "120",
								cy: "96",
								rx: listening ? 8 : 7,
								ry: listening ? 5.5 : 4.5,
								fill: "#00d4ff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "80",
								cy: "96",
								r: "2.2",
								fill: "#e6f4ff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "120",
								cy: "96",
								r: "2.2",
								fill: "#e6f4ff"
							})
						]
					}),
					speaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						transform: "translate(100 132)",
						stroke: "#00d4ff",
						strokeWidth: "1.4",
						strokeLinecap: "round",
						children: [
							-16,
							-10,
							-4,
							2,
							8,
							14
						].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: x,
							x2: x,
							y1: "-6",
							y2: "6",
							className: "wave-bar",
							style: { animationDelay: `${i * .09}s` }
						}, x))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M84 132 Q100 140 116 132",
						fill: "none",
						stroke: "#00d4ff",
						strokeWidth: "1.4",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M70 148 L86 160 M130 148 L114 160",
						stroke: "#00d4ff",
						strokeOpacity: "0.55",
						strokeWidth: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						transform: "translate(100 210)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
							points: "0,-16 14,-8 14,8 0,16 -14,8 -14,-8",
							fill: "none",
							stroke: "#00d4ff",
							strokeWidth: "1.3",
							filter: "url(#nova-glow)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "6",
							fill: "url(#core)",
							className: "core-pulse"
						})]
					})
				]
			})
		]
	});
}
function Frame({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("holo-frame", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "c tl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "c tr" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "c bl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "c br" }),
			children
		]
	});
}
var HUD_STEPS = [
	{
		id: "thinking",
		label: "THINKING",
		detail: "Understanding your message..."
	},
	{
		id: "searching",
		label: "SEARCHING",
		detail: "Browsing for the best solution..."
	},
	{
		id: "analyzing",
		label: "ANALYZING",
		detail: "Processing context..."
	},
	{
		id: "preparing",
		label: "PREPARING",
		detail: "Crafting the perfect response..."
	}
];
var GREETING = {
	ar: "أهلاً بك، أنا نوفا. واش تحتاج نعاونك بيه اليوم؟",
	en: "Welcome. I am NOVA. How can I help you today?"
};
function isArabic(text) {
	return /[\u0600-\u06FF]/.test(text);
}
function detectLang(text, fallback = "en") {
	return isArabic(text) ? "ar" : fallback;
}
function newId() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function MiniBot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-6 shrink-0 text-nova-primary",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "4",
				width: "14",
				height: "14",
				rx: "3",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9.5",
				cy: "10",
				r: "1.3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "14.5",
				cy: "10",
				r: "1.3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 15h6",
				stroke: "currentColor",
				strokeWidth: "1.3",
				strokeLinecap: "round"
			})
		]
	});
}
function ChatPanel({ messages, streamingId, onFeedback }) {
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [messages, streamingId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-nova-primary/15 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.22em] text-nova-muted",
				children: "COMMS / LOG"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[10px] tabular-nums text-nova-muted",
				children: [messages.length, " TX"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nova-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3",
			children: [messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-8 text-center font-mono text-xs tracking-wide text-nova-muted",
				children: "Awaiting transmission…"
			}) : messages.map((m) => {
				const rtl = isArabic(m.text);
				const nova = m.role === "nova";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("flex gap-2", nova ? "items-start" : "flex-row-reverse items-start"),
					children: [nova ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBot, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[92%] space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							dir: rtl ? "rtl" : "ltr",
							className: cn("rounded-xl border px-3 py-2 text-[13px] leading-relaxed text-pretty", nova ? "rounded-tl-sm border-nova-primary/35 bg-nova-primary/8 text-nova-text shadow-[0_0_16px_rgba(0,212,255,0.08)]" : "rounded-tr-sm border-nova-accent/30 bg-nova-accent/10 text-nova-text"),
							children: m.text || (m.id === streamingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shimmer font-mono",
								children: "···"
							}) : "")
						}), nova && m.text && m.id !== streamingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Helpful",
								onClick: () => onFeedback(m.id, "up"),
								className: cn("rounded p-1 text-nova-muted hover:text-nova-primary", m.feedback === "up" && "text-nova-primary"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Not helpful",
								onClick: () => onFeedback(m.id, "down"),
								className: cn("rounded p-1 text-nova-muted hover:text-nova-danger", m.feedback === "down" && "text-nova-danger"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-3.5" })
							})]
						}) : null]
					})]
				}, m.id);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
		})]
	});
}
function MicStage({ phase, live, lang, engaged, partial, draft, onDraft, onSend, onMic }) {
	const listening = phase === "listening";
	const speaking = phase === "speaking";
	const thinking = phase === "thinking";
	const submit = (e) => {
		e.preventDefault();
		onSend();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-5 max-w-md px-4 text-center font-mono text-[11px] tracking-wide text-nova-primary/80",
				children: partial ? partial : !engaged ? lang === "ar" ? "اضغط الميكروفون للتشغيل" : "TAP MIC TO ENGAGE" : listening ? lang === "ar" ? "أستمع…" : "LISTENING" : speaking ? lang === "ar" ? "أتحدث…" : "SPEAKING" : thinking ? lang === "ar" ? "أحلل…" : "THINKING" : live ? "READY" : "STANDBY"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex size-20 items-center justify-center",
				children: [
					listening || !engaged ? [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ring-listen pointer-events-none absolute inset-0 rounded-full border border-nova-primary",
						style: { animationDelay: `${i * .55}s` }
					}, i)) : null,
					speaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute inset-[-10px] flex items-center justify-center gap-0.5",
						children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wave-bar h-8 w-0.5 rounded-full bg-nova-primary",
							style: { animationDelay: `${i * .08}s` }
						}, i))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onMic,
						"aria-label": listening ? "Stop listening" : engaged ? "Start listening" : "Engage NOVA",
						className: cn("relative z-10 flex size-20 items-center justify-center rounded-full border-2 transition-transform duration-150 ease-out active:scale-[0.96]", listening || !engaged ? "border-nova-primary bg-nova-primary/20 shadow-[0_0_28px_rgba(0,212,255,0.45)]" : speaking ? "border-nova-accent bg-nova-accent/20" : "border-nova-primary/50 bg-nova-primary/10 hover:border-nova-primary"),
						children: listening || live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-7 text-nova-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-7 text-nova-muted" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "flex w-full max-w-md items-center gap-2 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft,
					onChange: (e) => onDraft(e.target.value),
					dir: lang === "ar" ? "rtl" : "ltr",
					placeholder: lang === "ar" ? "اكتب رسالتك…" : "Transmit a message…",
					suppressHydrationWarning: true,
					className: "h-11 min-w-0 flex-1 rounded-lg border border-nova-primary/25 bg-nova-bg/70 px-3 font-sans text-sm text-nova-text outline-none placeholder:text-nova-muted focus:border-nova-primary/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					"aria-label": "Send",
					className: "flex size-11 items-center justify-center rounded-lg border border-nova-primary/40 bg-nova-primary/10 text-nova-primary transition-transform duration-150 active:scale-[0.96]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	});
}
var ICONS = {
	thinking: Brain,
	searching: ScanSearch,
	analyzing: Activity,
	preparing: AudioLines
};
var ORDER = [
	"thinking",
	"searching",
	"analyzing",
	"preparing"
];
function StatusHud({ active, compact }) {
	const activeIdx = active ? ORDER.indexOf(active) : -1;
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center gap-1.5 overflow-x-auto px-3",
		children: HUD_STEPS.map((step, i) => {
			const on = i <= activeIdx;
			const current = step.id === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("shrink-0 rounded-full border px-2 py-1 font-mono text-[9px] tracking-widest", current ? "border-nova-primary/60 text-nova-primary" : on ? "border-nova-primary/30 text-nova-primary/80" : "border-nova-primary/15 text-nova-muted"),
				children: step.label
			}, step.id);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		className: "flex h-full flex-col gap-3 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.22em] text-nova-muted",
				children: "SYS / PIPELINE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-1 flex-col justify-evenly gap-2",
				children: HUD_STEPS.map((step, i) => {
					const Icon = ICONS[step.id];
					const on = i <= activeIdx;
					const current = step.id === active;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-md border px-3 py-3 transition-colors duration-300", current ? "border-nova-primary/50 bg-nova-primary/8" : on ? "border-nova-primary/25 bg-nova-primary/5" : "border-nova-primary/10 bg-transparent"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: cn("size-3.5", current || on ? "text-nova-primary" : "text-nova-muted"),
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("font-mono text-[11px] tracking-[0.18em]", current ? "hud-active" : on ? "text-nova-primary" : "text-nova-muted", current && "shimmer"),
								children: step.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-1 text-[12px] leading-snug", current || on ? "text-nova-text/80" : "text-nova-muted"),
							children: step.detail
						})]
					}, step.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-widest text-nova-muted/80",
				children: "CORE · STABLE"
			})
		]
	});
}
var MODES = [
	{
		id: "auto",
		label: "AUTO"
	},
	{
		id: "chat",
		label: "CHAT"
	},
	{
		id: "action",
		label: "ACTION"
	}
];
function TopBar({ mode, live, onMode, onToggleLive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-14 items-center justify-between gap-3 border-b border-nova-primary/15 px-3 sm:px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-8 items-center justify-center rounded-md border border-nova-primary/40 bg-nova-primary/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
						className: "size-4 text-nova-primary",
						strokeWidth: 1.75
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "glow-cyan font-mono text-sm tracking-[0.28em] text-nova-primary",
						children: "NOVA AI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden font-mono text-[10px] tracking-widest text-nova-muted sm:block",
						children: "HOLOGRAPHIC OPS"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 rounded-full border border-nova-primary/20 bg-nova-bg/60 p-1",
				children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onMode(m.id),
					className: cn("rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest transition-colors duration-150 sm:px-3", mode === m.id ? "bg-nova-primary/15 text-nova-primary" : "text-nova-muted hover:text-nova-text"),
					children: m.label
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onToggleLive,
				className: "flex items-center gap-2 rounded-full border border-nova-primary/20 px-2 py-1 sm:px-3",
				"aria-pressed": live,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn(live ? "live-dot" : "size-2 rounded-full bg-nova-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] tracking-[0.2em] text-nova-text",
					children: live ? "LIVE MODE" : "PAUSED"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] tracking-[0.18em] text-nova-text",
					children: "Online"
				})]
			})
		]
	});
}
async function streamChat(input) {
	const res = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		signal: input.signal,
		body: JSON.stringify({
			mode: input.mode,
			langHint: input.langHint,
			messages: input.messages.map((m) => ({
				role: m.role === "nova" ? "assistant" : "user",
				content: m.text
			}))
		})
	});
	if (!res.ok || !res.body) {
		const err = await res.json().catch(() => null);
		throw new Error(err?.error || `uplink failed (${res.status})`);
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let leftover = "";
	let full = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		leftover += decoder.decode(value, { stream: true });
		const lines = leftover.split("\n");
		leftover = lines.pop() ?? "";
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed.startsWith("data:")) continue;
			const data = trimmed.slice(5).trim();
			if (!data) continue;
			try {
				const json = JSON.parse(data);
				if (json.t === "d" && json.c) {
					full += json.c;
					input.onDelta(json.c);
				}
			} catch {}
		}
	}
	return full;
}
async function fetchTtsBlob(text, language, signal) {
	const res = await fetch("/api/tts", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		signal,
		body: JSON.stringify({
			text,
			language
		})
	});
	if (!res.ok) return null;
	if ((res.headers.get("content-type") || "").includes("application/json")) return null;
	return res.blob();
}
var KEY = "nova-memory-v1";
var empty = {
	messages: [],
	lang: "en",
	mode: "auto",
	live: true
};
function loadMemory() {
	if (typeof window === "undefined") return empty;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		return {
			messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-40) : [],
			lang: parsed.lang === "ar" ? "ar" : "en",
			mode: parsed.mode === "chat" || parsed.mode === "action" ? parsed.mode : "auto",
			live: parsed.live !== false
		};
	} catch {
		return empty;
	}
}
function saveMemory(partial) {
	if (typeof window === "undefined") return;
	try {
		const current = loadMemory();
		const next = {
			messages: (partial.messages ?? current.messages).slice(-40),
			lang: partial.lang ?? current.lang,
			mode: partial.mode ?? current.mode,
			live: partial.live ?? current.live
		};
		localStorage.setItem(KEY, JSON.stringify(next));
	} catch {}
}
var BOUNDARY = /(?<=[.!?؟。…])\s+|(?<=\n)/;
function pullSentences(buffer) {
	const parts = buffer.split(BOUNDARY);
	if (parts.length <= 1) return {
		ready: [],
		rest: buffer
	};
	const rest = parts.pop() ?? "";
	return {
		ready: parts.map((p) => p.trim()).filter((p) => p.length >= 2),
		rest
	};
}
function getCtor() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function speechSupported() {
	return getCtor() !== null;
}
function createRecognizer(lang) {
	const Ctor = getCtor();
	if (!Ctor) return null;
	const rec = new Ctor();
	rec.continuous = true;
	rec.interimResults = true;
	rec.maxAlternatives = 1;
	rec.lang = lang === "ar" ? "ar-MA" : "en-US";
	return rec;
}
function browserSpeak(text, lang) {
	return new Promise((resolve) => {
		if (typeof window === "undefined" || !window.speechSynthesis) {
			resolve();
			return;
		}
		window.speechSynthesis.cancel();
		const u = new SpeechSynthesisUtterance(text);
		u.lang = lang === "ar" ? "ar-SA" : "en-US";
		u.rate = 1.02;
		u.pitch = .92;
		u.onend = () => resolve();
		u.onerror = () => resolve();
		window.speechSynthesis.speak(u);
	});
}
function browserSpeakStop() {
	if (typeof window === "undefined") return;
	window.speechSynthesis?.cancel();
}
var TtsQueue = class {
	queue = [];
	draining = false;
	aborted = false;
	audio = null;
	objectUrl = null;
	onStart = null;
	onEnd = null;
	enqueue(text) {
		const clean = text.replace(/\s+/g, " ").trim();
		if (!clean || this.aborted) return;
		this.queue.push(clean);
		if (!this.draining) this.drain();
	}
	abort() {
		this.aborted = true;
		this.queue = [];
		this.stopAudio();
		browserSpeakStop();
	}
	reset() {
		this.abort();
		this.aborted = false;
		this.draining = false;
	}
	get active() {
		return this.draining;
	}
	stopAudio() {
		if (this.audio) {
			this.audio.pause();
			this.audio.src = "";
			this.audio = null;
		}
		if (this.objectUrl) {
			URL.revokeObjectURL(this.objectUrl);
			this.objectUrl = null;
		}
	}
	async drain() {
		this.draining = true;
		this.onStart?.();
		while (this.queue.length && !this.aborted) {
			const text = this.queue.shift();
			await this.speakOne(text);
		}
		const clean = !this.aborted;
		this.draining = false;
		if (clean) this.onEnd?.();
	}
	async speakOne(text) {
		if (this.aborted) return;
		const lang = isArabic(text) ? "ar" : "en";
		const language = lang === "ar" ? "ar-EG" : "en";
		try {
			const blob = await fetchTtsBlob(text, language);
			if (this.aborted) return;
			if (blob && blob.size > 64) {
				await this.playBlob(blob);
				return;
			}
		} catch {}
		if (this.aborted) return;
		await browserSpeak(text, lang);
	}
	playBlob(blob) {
		return new Promise((resolve) => {
			this.stopAudio();
			const url = URL.createObjectURL(blob);
			this.objectUrl = url;
			const audio = new Audio(url);
			this.audio = audio;
			const done = () => {
				audio.onended = null;
				audio.onerror = null;
				resolve();
			};
			audio.onended = done;
			audio.onerror = done;
			audio.play().catch(() => done());
		});
	}
};
var HUD_ORDER = [
	"thinking",
	"searching",
	"analyzing",
	"preparing"
];
function useNova() {
	const [mode, setModeState] = (0, import_react.useState)("auto");
	const [live, setLiveState] = (0, import_react.useState)(true);
	const [phase, setPhase] = (0, import_react.useState)("boot");
	const [hud, setHud] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [partial, setPartial] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [lang, setLang] = (0, import_react.useState)("en");
	const [engaged, setEngaged] = (0, import_react.useState)(false);
	const [streamingId, setStreamingId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const liveRef = (0, import_react.useRef)(live);
	const phaseRef = (0, import_react.useRef)(phase);
	const langRef = (0, import_react.useRef)(lang);
	const modeRef = (0, import_react.useRef)(mode);
	const messagesRef = (0, import_react.useRef)(messages);
	const busyRef = (0, import_react.useRef)(false);
	const abortRef = (0, import_react.useRef)(null);
	const ttsRef = (0, import_react.useRef)(new TtsQueue());
	const recRef = (0, import_react.useRef)(null);
	const hudTimer = (0, import_react.useRef)([]);
	const listenWatch = (0, import_react.useRef)(null);
	const sendRef = (0, import_react.useRef)(async () => {});
	liveRef.current = live;
	phaseRef.current = phase;
	langRef.current = lang;
	modeRef.current = mode;
	messagesRef.current = messages;
	const persist = (0, import_react.useCallback)((next) => {
		saveMemory({
			messages: next?.messages ?? messagesRef.current,
			lang: next?.lang ?? langRef.current,
			mode: next?.mode ?? modeRef.current,
			live: next?.live ?? liveRef.current
		});
	}, []);
	const stopHud = (0, import_react.useCallback)(() => {
		hudTimer.current.forEach((id) => window.clearTimeout(id));
		hudTimer.current = [];
	}, []);
	const runHud = (0, import_react.useCallback)(() => {
		stopHud();
		setHud("thinking");
		HUD_ORDER.forEach((step, i) => {
			if (i === 0) return;
			const id = window.setTimeout(() => setHud(step), i * 420);
			hudTimer.current.push(id);
		});
	}, [stopHud]);
	const stopRec = (0, import_react.useCallback)(() => {
		try {
			recRef.current?.abort();
		} catch {}
		recRef.current = null;
		setPartial("");
		if (listenWatch.current) {
			window.clearTimeout(listenWatch.current);
			listenWatch.current = null;
		}
	}, []);
	const interrupt = (0, import_react.useCallback)(() => {
		abortRef.current?.abort();
		abortRef.current = null;
		ttsRef.current.reset();
		browserSpeakStop();
		stopRec();
		stopHud();
		setHud(null);
		setStreamingId(null);
		busyRef.current = false;
	}, [stopHud, stopRec]);
	const sendText = (0, import_react.useCallback)(async (raw) => {
		const text = raw.trim();
		if (!text || busyRef.current) return;
		busyRef.current = true;
		stopRec();
		ttsRef.current.reset();
		const nextLang = detectLang(text, langRef.current);
		setLang(nextLang);
		langRef.current = nextLang;
		const history = messagesRef.current.filter((m) => m.text);
		const userMsg = {
			id: newId(),
			role: "user",
			text,
			ts: Date.now()
		};
		const novaMsg = {
			id: newId(),
			role: "nova",
			text: "",
			ts: Date.now()
		};
		const seeded = [...history, userMsg];
		const visible = [...seeded, novaMsg];
		setMessages(visible);
		messagesRef.current = visible;
		setStreamingId(novaMsg.id);
		setPhase("thinking");
		runHud();
		setError(null);
		const ac = new AbortController();
		abortRef.current = ac;
		let assembled = "";
		let ttsBuf = "";
		let startedVoice = false;
		ttsRef.current.onStart = () => {
			startedVoice = true;
			setPhase("speaking");
			setHud("preparing");
		};
		ttsRef.current.onEnd = () => {
			setPhase(liveRef.current ? "listening" : "idle");
			setHud(null);
			busyRef.current = false;
		};
		try {
			await streamChat({
				messages: seeded,
				mode: modeRef.current,
				langHint: nextLang,
				signal: ac.signal,
				onDelta: (chunk) => {
					assembled += chunk;
					ttsBuf += chunk;
					setMessages((prev) => prev.map((m) => m.id === novaMsg.id ? {
						...m,
						text: assembled
					} : m));
					const { ready, rest } = pullSentences(ttsBuf);
					ttsBuf = rest;
					for (const s of ready) ttsRef.current.enqueue(s);
				}
			});
			if (ttsBuf.trim()) ttsRef.current.enqueue(ttsBuf);
			if (!assembled.trim()) {
				assembled = nextLang === "ar" ? "ما قدرتش نوصل للنواة دابا." : "Neural core did not return a signal.";
				setMessages((prev) => prev.map((m) => m.id === novaMsg.id ? {
					...m,
					text: assembled
				} : m));
				ttsRef.current.enqueue(assembled);
			}
		} catch (err) {
			if (err.name === "AbortError") {
				busyRef.current = false;
				return;
			}
			const fallback = nextLang === "ar" ? "النواة العصبية مطفية دابا. نقدر نسمع ونتكلم محلياً حتى يرجع الاتصال." : "Neural core is dark. I can still listen and speak locally until the uplink returns.";
			assembled = fallback;
			setMessages((prev) => prev.map((m) => m.id === novaMsg.id ? {
				...m,
				text: fallback
			} : m));
			setError(err.message);
			ttsRef.current.enqueue(fallback);
		} finally {
			setStreamingId(null);
			stopHud();
			const finalMsgs = messagesRef.current.map((m) => m.id === novaMsg.id ? {
				...m,
				text: assembled
			} : m);
			setMessages(finalMsgs);
			messagesRef.current = finalMsgs;
			persist({
				messages: finalMsgs,
				lang: nextLang
			});
			if (!startedVoice && !ttsRef.current.active) {
				setPhase(liveRef.current ? "listening" : "idle");
				setHud(null);
				busyRef.current = false;
			}
		}
	}, [
		persist,
		runHud,
		stopHud,
		stopRec
	]);
	sendRef.current = sendText;
	const startListening = (0, import_react.useCallback)(() => {
		if (!liveRef.current) return;
		if (busyRef.current) return;
		if (phaseRef.current === "speaking" || phaseRef.current === "thinking") return;
		stopRec();
		if (!speechSupported()) {
			setPhase("idle");
			return;
		}
		const rec = createRecognizer(langRef.current);
		if (!rec) {
			setPhase("idle");
			return;
		}
		recRef.current = rec;
		let finalText = "";
		rec.onresult = (ev) => {
			let interim = "";
			for (let i = ev.resultIndex; i < ev.results.length; i++) {
				const piece = ev.results[i]?.[0]?.transcript ?? "";
				if (ev.results[i]?.isFinal) finalText += piece;
				else interim += piece;
			}
			setPartial((finalText + " " + interim).trim());
			if (listenWatch.current) window.clearTimeout(listenWatch.current);
			listenWatch.current = window.setTimeout(() => {
				const said = (finalText || interim).trim();
				if (said.length > 1) {
					stopRec();
					sendRef.current(said);
				}
			}, 1100);
		};
		rec.onerror = (ev) => {
			if (ev.error === "not-allowed") {
				setError("Microphone permission denied");
				setLiveState(false);
				liveRef.current = false;
				setPhase("idle");
			}
		};
		rec.onend = () => {
			if (phaseRef.current === "listening" && liveRef.current && recRef.current === rec) try {
				rec.start();
			} catch {}
		};
		try {
			rec.start();
			setPhase("listening");
		} catch {
			setPhase("idle");
		}
	}, [stopRec]);
	(0, import_react.useEffect)(() => {
		if (phase === "listening") startListening();
	}, [phase, startListening]);
	(0, import_react.useEffect)(() => {
		const stored = loadMemory();
		setMessages(stored.messages);
		messagesRef.current = stored.messages;
		setModeState(stored.mode);
		modeRef.current = stored.mode;
		const navLang = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("ar") ? "ar" : stored.lang;
		setLang(navLang);
		langRef.current = navLang;
		const nextLive = stored.mode === "chat" ? stored.live : true;
		setLiveState(nextLive);
		liveRef.current = nextLive;
		setPhase("idle");
	}, []);
	const speakGreeting = (0, import_react.useCallback)(() => {
		const nextLang = langRef.current;
		const text = GREETING[nextLang];
		const novaMsg = {
			id: newId(),
			role: "nova",
			text,
			ts: Date.now()
		};
		const visible = [...messagesRef.current, novaMsg];
		setMessages(visible);
		messagesRef.current = visible;
		persist({
			messages: visible,
			lang: nextLang
		});
		busyRef.current = true;
		ttsRef.current.reset();
		ttsRef.current.onStart = () => setPhase("speaking");
		ttsRef.current.onEnd = () => {
			busyRef.current = false;
			setPhase(liveRef.current ? "listening" : "idle");
		};
		setPhase("speaking");
		ttsRef.current.enqueue(text);
	}, [persist]);
	const engage = (0, import_react.useCallback)(() => {
		if (engaged) return;
		setEngaged(true);
		const nextLive = modeRef.current !== "chat";
		setLiveState(nextLive);
		liveRef.current = nextLive;
		speakGreeting();
	}, [engaged, speakGreeting]);
	const setMode = (0, import_react.useCallback)((m) => {
		setModeState(m);
		modeRef.current = m;
		const nextLive = m !== "chat";
		setLiveState(nextLive);
		liveRef.current = nextLive;
		persist({
			mode: m,
			live: nextLive
		});
		if (nextLive && phaseRef.current === "idle" && engaged) setPhase("listening");
		if (!nextLive) {
			stopRec();
			if (phaseRef.current === "listening") setPhase("idle");
		}
	}, [
		engaged,
		persist,
		stopRec
	]);
	const toggleLive = (0, import_react.useCallback)(() => {
		const next = !liveRef.current;
		setLiveState(next);
		liveRef.current = next;
		persist({ live: next });
		if (next && !busyRef.current && engaged) setPhase("listening");
		else if (!next && phaseRef.current === "listening") {
			stopRec();
			setPhase("idle");
		}
	}, [
		engaged,
		persist,
		stopRec
	]);
	const onMic = (0, import_react.useCallback)(() => {
		if (!engaged) {
			engage();
			return;
		}
		if (phaseRef.current === "speaking" || phaseRef.current === "thinking") {
			interrupt();
			setPhase("listening");
			return;
		}
		if (phaseRef.current === "listening") {
			stopRec();
			setPhase("idle");
			setLiveState(false);
			liveRef.current = false;
			return;
		}
		setLiveState(true);
		liveRef.current = true;
		setPhase("listening");
	}, [
		engage,
		engaged,
		interrupt,
		stopRec
	]);
	const sendDraft = (0, import_react.useCallback)(() => {
		const text = draft.trim();
		if (!text) return;
		if (!engaged) setEngaged(true);
		setDraft("");
		sendText(text);
	}, [
		draft,
		engaged,
		sendText
	]);
	const onFeedback = (0, import_react.useCallback)((id, vote) => {
		setMessages((prev) => {
			const next = prev.map((m) => m.id === id ? {
				...m,
				feedback: vote
			} : m);
			messagesRef.current = next;
			persist({ messages: next });
			return next;
		});
	}, [persist]);
	(0, import_react.useEffect)(() => () => interrupt(), [interrupt]);
	return {
		mode,
		live,
		phase,
		hud,
		messages,
		partial,
		draft,
		setDraft,
		lang,
		engaged,
		streamingId,
		error,
		engage,
		setMode,
		toggleLive,
		onMic,
		sendDraft,
		onFeedback
	};
}
function NovaApp() {
	const n = useNova();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nova-grid relative flex h-dvh min-h-0 flex-col overflow-hidden text-nova-text",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nova-scanlines pointer-events-none absolute inset-0 z-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
				mode: n.mode,
				live: n.live,
				onMode: n.setMode,
				onToggleLive: n.toggleLive
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-nova-primary/10 py-2 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusHud, {
					active: n.hud,
					compact: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 lg:grid-cols-[260px_minmax(0,1fr)_320px] lg:gap-4 lg:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden min-h-0 lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusHud, { active: n.hud })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-h-0 flex-col items-center justify-between gap-2 py-1 lg:py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden font-mono text-[10px] tracking-[0.32em] text-nova-muted lg:block",
								children: n.phase === "thinking" ? "NEURAL CORE · ACTIVE" : n.phase === "speaking" ? "VOICE UPLINK · TX" : n.phase === "listening" ? "VOICE UPLINK · RX" : "NEURAL CORE · IDLE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex min-h-0 w-full flex-1 items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloAvatar, { phase: n.phase })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicStage, {
								phase: n.phase,
								live: n.live,
								lang: n.lang,
								engaged: n.engaged,
								partial: n.partial,
								draft: n.draft,
								onDraft: n.setDraft,
								onSend: n.sendDraft,
								onMic: n.onMic
							}),
							n.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-center font-mono text-[11px] text-nova-danger",
								children: n.error
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "min-h-0 max-lg:h-[28vh]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
							messages: n.messages,
							streamingId: n.streamingId,
							onFeedback: n.onFeedback
						})
					})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NovaApp, {});
}
//#endregion
export { Home as component };
