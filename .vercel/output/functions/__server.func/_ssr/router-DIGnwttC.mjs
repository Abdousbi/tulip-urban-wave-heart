import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { L as require_react, _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DIGnwttC.js
var router_DIGnwttC_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-BKgwgpYw.css";
var APP_NAME = "NOVA";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#050d1f"
			},
			{
				name: "description",
				content: "NOVA — holographic voice AI assistant."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Share+Tech+Mono&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-nova-bg text-nova-text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-Dg3U3qaL.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
function systemPrompt(mode, langHint) {
	return [
		"You are NOVA, a holographic voice AI — calm, precise, a little witty, never servile.",
		"Sound like a capable operations officer, not a chatbot. No filler, no emoji, no markdown tables unless asked.",
		"Keep spoken replies tight: 1–3 sentences for simple asks; longer only when the user wants depth.",
		"Mirror the user's language. If they write Moroccan Darija, answer in Darija. If MSA, MSA. If English, English.",
		"Never mention being Grok, xAI, OpenAI, or an LLM unless directly asked what model you are.",
		"You have no hands on their machine. In-console you can chat, remember this session, switch language, and advise.",
		mode === "action" ? "MODE: ACTION. Be decisive. Prefer short executable plans. You cannot click, type, or control the user's physical computer or OS — you run inside a holographic web console. If they ask to open apps, click windows, or drive the mouse, say so plainly and offer the next best thing you can actually do (draft, research, steps, in-console commands like switching language or clearing memory)." : mode === "chat" ? "MODE: CHAT. Conversational, no unsolicited actions." : "MODE: AUTO. Voice-first JARVIS. Be helpful, concise, and slightly technical. Offer to act when it is useful, but never pretend you control their PC.",
		`Language hint for this turn: ${langHint}.`
	].join(" ");
}
var CHAT_URL = "https://api.x.ai/v1/chat/completions";
var TTS_URL = "https://api.x.ai/v1/tts";
function authHeaders() {
	const key = process.env.XAI_API_KEY?.trim();
	if (!key) throw new Error("AI is not available in this environment");
	return {
		Authorization: `Bearer ${key}`,
		"Content-Type": "application/json"
	};
}
async function streamNovaChat(input) {
	if (!process.env.XAI_API_KEY?.trim()) return Response.json({ error: "AI is not available" }, { status: 503 });
	const trimmed = input.messages.slice(-16).map((m) => ({
		role: m.role,
		content: m.content.slice(0, 4e3)
	}));
	const upstream = await fetch(CHAT_URL, {
		method: "POST",
		headers: authHeaders(),
		signal: input.signal,
		body: JSON.stringify({
			model: "grok-4.5",
			stream: true,
			max_tokens: 700,
			temperature: .7,
			messages: [{
				role: "system",
				content: systemPrompt(input.mode, input.langHint)
			}, ...trimmed]
		})
	});
	if (!upstream.ok || !upstream.body) {
		const errText = await upstream.text().catch(() => "");
		return Response.json({
			error: `neural core error ${upstream.status}`,
			detail: errText.slice(0, 240)
		}, { status: 502 });
	}
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	const reader = upstream.body.getReader();
	let leftover = "";
	const stream = new ReadableStream({
		async pull(controller) {
			const { done, value } = await reader.read();
			if (done) {
				controller.enqueue(encoder.encode("data: {\"t\":\"done\"}\n\n"));
				controller.close();
				return;
			}
			leftover += decoder.decode(value, { stream: true });
			const lines = leftover.split("\n");
			leftover = lines.pop() ?? "";
			for (const line of lines) {
				const trimmedLine = line.trim();
				if (!trimmedLine.startsWith("data:")) continue;
				const data = trimmedLine.slice(5).trim();
				if (!data || data === "[DONE]") continue;
				try {
					const token = JSON.parse(data).choices?.[0]?.delta?.content;
					if (token) controller.enqueue(encoder.encode(`data: ${JSON.stringify({
						t: "d",
						c: token
					})}\n\n`));
				} catch {}
			}
		},
		cancel() {
			reader.cancel();
		}
	});
	return new Response(stream, { headers: {
		"Content-Type": "text/event-stream; charset=utf-8",
		"Cache-Control": "no-cache, no-transform",
		Connection: "keep-alive"
	} });
}
async function synthesizeSpeech(input) {
	if (!process.env.XAI_API_KEY?.trim()) return Response.json({ error: "AI is not available" }, { status: 503 });
	const text = input.text.slice(0, 1200);
	if (!text.trim()) return Response.json({ error: "empty" }, { status: 400 });
	const upstream = await fetch(TTS_URL, {
		method: "POST",
		headers: authHeaders(),
		signal: input.signal,
		body: JSON.stringify({
			text,
			voice_id: "helix",
			language: input.language,
			speed: 1.02,
			optimize_streaming_latency: 2,
			output_format: {
				codec: "mp3",
				sample_rate: 24e3,
				bit_rate: 64e3
			}
		})
	});
	if (!upstream.ok) {
		const errText = await upstream.text().catch(() => "");
		return Response.json({
			error: `voice error ${upstream.status}`,
			detail: errText.slice(0, 240)
		}, { status: 502 });
	}
	return new Response(upstream.body, { headers: {
		"Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
		"Cache-Control": "no-store"
	} });
}
var Route$1 = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid json" }, { status: 400 });
	}
	const messages = Array.isArray(body.messages) ? body.messages : [];
	if (messages.length === 0) return Response.json({ error: "messages required" }, { status: 400 });
	const mode = body.mode === "chat" || body.mode === "action" ? body.mode : "auto";
	const langHint = body.langHint === "ar" ? "ar" : "en";
	return streamNovaChat({
		messages: messages.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"),
		mode,
		langHint,
		signal: request.signal
	});
} } } });
var Route = createFileRoute("/api/tts")({ server: { handlers: { POST: async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid json" }, { status: 400 });
	}
	return synthesizeSpeech({
		text: typeof body.text === "string" ? body.text : "",
		language: typeof body.language === "string" ? body.language : "en",
		signal: request.signal
	});
} } } });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	ApiChatRoute: Route$1.update({
		id: "/api/chat",
		path: "/api/chat",
		getParentRoute: () => Route$3
	}),
	ApiTtsRoute: Route.update({
		id: "/api/tts",
		path: "/api/tts",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getRouter, router_DIGnwttC_exports as t };
