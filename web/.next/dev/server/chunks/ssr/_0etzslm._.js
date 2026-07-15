module.exports = [
"[project]/config/theme.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Reusable theme styling classes to ensure design system consistency.
 */ __turbopack_context__.s([
    "theme",
    ()=>theme
]);
const theme = {
    // Page container layouts
    container: "max-w-6xl mx-auto px-6 py-10 w-full",
    // Custom Card panel
    card: "octagon-panel rounded-2xl p-6 transition-all duration-300",
    // Interactive buttons
    button: {
        primary: "px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/10 hover:shadow-red-500/25 active:scale-97 text-center",
        secondary: "px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 font-bold text-sm tracking-wide transition-all active:scale-97 text-center",
        gold: "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide transition-all active:scale-97 text-center"
    },
    // Form input styles
    input: "w-full bg-zinc-950/80 border border-zinc-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors"
};
}),
"[project]/components/UI/GlassCard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlassCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/theme.js [app-ssr] (ecmascript)");
;
;
function GlassCard({ children, className = "", hoverEffect = true }) {
    const hoverClass = hoverEffect ? "glow-red" : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["theme"].card} ${hoverClass} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/UI/GlassCard.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/UI/Button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/theme.js [app-ssr] (ecmascript)");
;
;
function Button({ children, onClick, variant = "primary", type = "button", disabled = false, className = "", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        onClick: onClick,
        disabled: disabled,
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["theme"].button[variant]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/UI/Button.js",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/data/rankings/nam_52.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nam_52",
    ()=>nam_52
]);
const nam_52 = {
    weightClass: "52kg Nam",
    status: "Không thuộc hệ thống thi đấu chính thức",
    description: "LION Championship không tổ chức thi đấu hạng cân 52kg Nam. Hạng cân nhỏ nhất của nam là 56kg.",
    champion: null,
    rankings: []
};
}),
"[project]/data/rankings/nam_56.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nam_56",
    ()=>nam_56
]);
const nam_56 = {
    weightClass: "56kg Nam",
    champion: {
        name: "Lê Văn Tuần",
        club: "Vietnam Top Team",
        record: "8-3-0",
        photo: "/lvt.png"
    },
    rankings: [
        {
            rank: 1,
            name: "Phạm Văn Nam",
            club: "Saigon Sports Club",
            record: "7-1-0"
        },
        {
            rank: 2,
            name: "Trần Minh Nhựt",
            club: "Liên Phong Club",
            record: "5-2-0"
        },
        {
            rank: 3,
            name: "Đỗ Huy Hoàng",
            club: "KSC MMA",
            record: "6-2-0"
        },
        {
            rank: 4,
            name: "Nguyễn Phú Thịnh",
            club: "Lợi Hổ Club",
            record: "5-1-0"
        },
        {
            rank: 5,
            name: "Bùi Trường Sinh",
            club: "Liên Phong Club",
            record: "6-3-0"
        }
    ]
};
}),
"[project]/data/rankings/nam_60.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nam_60",
    ()=>nam_60
]);
const nam_60 = {
    weightClass: "60kg Nam",
    champion: {
        name: "Trần Ngọc Lượng",
        club: "Saigon Sports Club",
        record: "7-1-0",
        photo: "/tnl.png"
    },
    rankings: [
        {
            rank: 1,
            name: "Lê Văn Tuần",
            club: "Vietnam Top Team",
            record: "7-3-0"
        },
        {
            rank: 2,
            name: "Nguyễn Trần Duy Nhất",
            club: "No1 Muay Club",
            record: "4-0-0"
        },
        {
            rank: 3,
            name: "Bùi Trường Sinh",
            club: "Liên Phong Club",
            record: "6-2-0"
        },
        {
            rank: 4,
            name: "Trần Minh Nhựt",
            club: "Liên Phong Club",
            record: "5-2-0"
        },
        {
            rank: 5,
            name: "Đỗ Huy Hoàng",
            club: "KSC MMA",
            record: "5-2-0"
        }
    ]
};
}),
"[project]/data/rankings/nam_65.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nam_65",
    ()=>nam_65
]);
const nam_65 = {
    weightClass: "65kg Nam",
    champion: {
        name: "Nghiêm Văn Ý",
        club: "Wushu King",
        record: "7-2-0",
        photo: "/nvy.png"
    },
    rankings: [
        {
            rank: 1,
            name: "Felipe Negochadle",
            club: "Vietnam Top Team",
            record: "6-1-0"
        },
        {
            rank: 2,
            name: "Nguyễn Tiến Long",
            club: "Quyết Chiến MMA",
            record: "5-3-0"
        },
        {
            rank: 3,
            name: "Bàn Văn Hoàng",
            club: "Wushu King",
            record: "4-1-0"
        },
        {
            rank: 4,
            name: "Trần Quang Khải",
            club: "AGOGE Club",
            record: "3-2-0"
        },
        {
            rank: 5,
            name: "Nguyễn Văn Lâm",
            club: "Saigon Sports Club",
            record: "3-1-0"
        }
    ]
};
}),
"[project]/data/rankings/nam_70.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nam_70",
    ()=>nam_70
]);
const nam_70 = {
    weightClass: "70kg Nam",
    champion: {
        name: "Jovidon Khojaev",
        club: "Vietnam Top Team",
        record: "6-0-0",
        photo: "/jk.png"
    },
    rankings: [
        {
            rank: 1,
            name: "Bàn Văn Hoàng",
            club: "Wushu King",
            record: "5-1-0"
        },
        {
            rank: 2,
            name: "Trần Minh Trí",
            club: "Liên Phong Club",
            record: "4-2-0"
        },
        {
            rank: 3,
            name: "Lê Văn Thế Anh",
            club: "Võ đường Hùng Vương",
            record: "4-3-0"
        },
        {
            rank: 4,
            name: "Nguyễn Văn Đạt",
            club: "Vietnam Top Team",
            record: "3-2-0"
        },
        {
            rank: 5,
            name: "Nguyễn Cát Tùng",
            club: "Liên Phong Club",
            record: "3-1-0"
        }
    ]
};
}),
"[project]/data/rankings/nam_77.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nam_77",
    ()=>nam_77
]);
const nam_77 = {
    weightClass: "77kg Nam",
    status: "Đang bỏ trống",
    description: "Aleksei Filonenko (Nhà vô địch đầu tiên) đã trả lại đai vô địch do chấn thương. Chưa có nhà vô địch mới.",
    champion: {
        name: "Đang bỏ trống",
        club: "",
        record: ""
    },
    rankings: [
        {
            rank: 1,
            name: "Lý Văn Huỳnh",
            club: "Wushu King",
            record: "4-1-0"
        },
        {
            rank: 2,
            name: "Đỗ Thành Chương",
            club: "KSC MMA",
            record: "4-2-0"
        },
        {
            rank: 3,
            name: "Dương Đức Tùng",
            club: "KSC MMA",
            record: "3-2-0"
        },
        {
            rank: 4,
            name: "Trần Trung Nghĩa",
            club: "Vietnam Top Team",
            record: "3-1-0"
        },
        {
            rank: 5,
            name: "Nguyễn Văn Hùng",
            club: "Saigon Sports Club",
            record: "2-1-0"
        }
    ]
};
}),
"[project]/data/rankings/nu_48.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nu_48",
    ()=>nu_48
]);
const nu_48 = {
    weightClass: "48kg Nữ",
    status: "Không thuộc hệ thống thi đấu chính thức",
    description: "LION Championship không tổ chức thi đấu hạng cân 48kg Nữ. Hạng cân nhỏ nhất của nữ là 52kg.",
    champion: null,
    rankings: []
};
}),
"[project]/data/rankings/nu_52.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nu_52",
    ()=>nu_52
]);
const nu_52 = {
    weightClass: "52kg Nữ",
    champion: {
        name: "Nguyễn Vũ Quỳnh Hoa",
        club: "Liên Phong Club",
        record: "6-0-0",
        photo: "/nvqh.png"
    },
    rankings: [
        {
            rank: 1,
            name: "Lò Thị Phung",
            club: "Sơn La MMA",
            record: "5-2-0"
        },
        {
            rank: 2,
            name: "Chelsey Cashwell",
            club: "Saigon Sports Club",
            record: "4-1-0"
        },
        {
            rank: 3,
            name: "Nguyễn Thị Thanh Chi",
            club: "No1 Muay Club",
            record: "4-1-0"
        },
        {
            rank: 4,
            name: "Trần Thị Mỹ Hằng",
            club: "Liên Phong Club",
            record: "3-2-0"
        },
        {
            rank: 5,
            name: "Lê Chiều Xuân",
            club: "KSC MMA",
            record: "3-1-0"
        }
    ]
};
}),
"[project]/app/lion/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UI$2f$GlassCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UI/GlassCard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UI$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UI/Button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/theme.js [app-ssr] (ecmascript)");
// Import rankings mock data
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_52$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nam_52.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_56$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nam_56.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_60$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nam_60.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_65$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nam_65.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_70$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nam_70.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_77$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nam_77.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nu_48$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nu_48.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nu_52$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/rankings/nu_52.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function LionPage() {
    const divisions = {
        "56_nam": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_56$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_56"],
        "60_nam": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_60$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_60"],
        "65_nam": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_65$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_65"],
        "70_nam": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_70$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_70"],
        "77_nam": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_77$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_77"],
        "52_nu": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nu_52$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nu_52"],
        "52_nam": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_52$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_52"],
        "48_nu": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nu_48$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nu_48"]
    };
    const [selectedDiv, setSelectedDiv] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("56_nam");
    const currentRankings = divisions[selectedDiv];
    // List of active champions to display at the top gallery
    const champions = [
        {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_56$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_56"].champion,
            division: "56kg Nam"
        },
        {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_60$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_60"].champion,
            division: "60kg Nam"
        },
        {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_65$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_65"].champion,
            division: "65kg Nam"
        },
        {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nam_70$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nam_70"].champion,
            division: "70kg Nam"
        },
        {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$rankings$2f$nu_52$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nu_52"].champion,
            division: "52kg Nữ"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["theme"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center md:text-left space-y-2 border-b border-zinc-900 pb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-black uppercase tracking-tight text-white",
                            children: "LION Championship"
                        }, void 0, false, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-500 font-mono tracking-widest uppercase",
                            children: "Bảng Xếp Hạng & Nhà Vô Địch MMA Việt Nam 2026"
                        }, void 0, false, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lion/page.js",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                            children: "🏆 Đương Kim Vô Địch (Champions)"
                        }, void 0, false, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
                            children: champions.map((champ, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UI$2f$GlassCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    className: "relative overflow-hidden group flex flex-col justify-between border border-red-500/10 hover:border-red-500/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 right-0 h-16 w-16 bg-red-600/10 rounded-bl-full flex items-center justify-center pointer-events-none group-hover:bg-red-600/20 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-red-500 font-bold rotate-45 translate-x-1.5 -translate-y-1.5",
                                                children: "★"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lion/page.js",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/lion/page.js",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 flex-1 flex flex-col justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-mono text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded",
                                                            children: champ.division
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 73,
                                                            columnNumber: 21
                                                        }, this),
                                                        champ.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-full aspect-[4/3] flex items-end justify-center mt-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)] pointer-events-none"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/lion/page.js",
                                                                    lineNumber: 80,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: champ.photo,
                                                                    alt: champ.name,
                                                                    className: "h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(239,68,68,0.3)] transition-all duration-300 group-hover:scale-108"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/lion/page.js",
                                                                    lineNumber: 81,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 78,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-900/50 bg-zinc-900/20 flex items-center justify-center mt-2 text-zinc-700",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl",
                                                                children: "👤"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/lion/page.js",
                                                                lineNumber: 89,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 88,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lion/page.js",
                                                    lineNumber: 72,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-black text-white leading-tight",
                                                            children: champ.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 95,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-zinc-400 mt-0.5",
                                                            children: champ.club
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 96,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lion/page.js",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lion/page.js",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-zinc-900 mt-4 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Record"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lion/page.js",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500 font-bold",
                                                    children: champ.record
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lion/page.js",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lion/page.js",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/lion/page.js",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lion/page.js",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-mono text-zinc-400 uppercase tracking-widest",
                            children: "📊 Bảng Xếp Hạng Thách Đấu (Contenders)"
                        }, void 0, false, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900",
                            children: Object.keys(divisions).map((key)=>{
                                const div = divisions[key];
                                const isSelected = selectedDiv === key;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedDiv(key),
                                    className: `px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${isSelected ? "bg-red-600 text-white shadow-md shadow-red-600/10" : "text-zinc-500 hover:text-zinc-300"}`,
                                    children: div.weightClass
                                }, key, false, {
                                    fileName: "[project]/app/lion/page.js",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UI$2f$GlassCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: "overflow-hidden border border-zinc-900 p-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-extrabold text-base text-zinc-200",
                                                children: [
                                                    "Hạng cân ",
                                                    currentRankings.weightClass
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lion/page.js",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this),
                                            currentRankings.champion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-zinc-400 mt-0.5",
                                                children: [
                                                    "Đương kim vô địch: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500 font-bold",
                                                        children: currentRankings.champion.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lion/page.js",
                                                        lineNumber: 145,
                                                        columnNumber: 40
                                                    }, this),
                                                    " (",
                                                    currentRankings.champion.club,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lion/page.js",
                                                lineNumber: 144,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-zinc-500 mt-0.5",
                                                children: currentRankings.description || "Hạng cân hiện đang bỏ trống hoặc không hoạt động."
                                            }, void 0, false, {
                                                fileName: "[project]/app/lion/page.js",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lion/page.js",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/lion/page.js",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                currentRankings.rankings && currentRankings.rankings.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-zinc-900 bg-zinc-950/40 text-zinc-500 uppercase tracking-wider font-mono",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-4 w-16 text-center",
                                                            children: "Thứ Hạng"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 160,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-4",
                                                            children: "Võ Sĩ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 161,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-4",
                                                            children: "Câu Lạc Bộ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 162,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-4 text-center",
                                                            children: "Thành Tích"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lion/page.js",
                                                            lineNumber: 163,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lion/page.js",
                                                    lineNumber: 159,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/lion/page.js",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: currentRankings.rankings.map((fighter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b border-zinc-900/40 hover:bg-zinc-900/10 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-4 text-center font-bold font-mono text-zinc-400 text-sm",
                                                                children: [
                                                                    "#",
                                                                    fighter.rank
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/lion/page.js",
                                                                lineNumber: 172,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-4 font-extrabold text-zinc-200 text-sm",
                                                                children: fighter.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/lion/page.js",
                                                                lineNumber: 175,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-4 text-zinc-400",
                                                                children: fighter.club
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/lion/page.js",
                                                                lineNumber: 178,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-4 text-center font-mono font-bold text-red-500/80",
                                                                children: fighter.record
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/lion/page.js",
                                                                lineNumber: 181,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, fighter.rank, true, {
                                                        fileName: "[project]/app/lion/page.js",
                                                        lineNumber: 168,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/lion/page.js",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lion/page.js",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/lion/page.js",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-10 text-center text-zinc-500 text-xs font-mono",
                                    children: "Không có dữ liệu bảng xếp hạng thách đấu cho hạng cân này."
                                }, void 0, false, {
                                    fileName: "[project]/app/lion/page.js",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lion/page.js",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lion/page.js",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/lion/page.js",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/lion/page.js",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0etzslm._.js.map