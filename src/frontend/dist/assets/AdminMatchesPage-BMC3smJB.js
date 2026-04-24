import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, g as useComposedRefs, f as cn, h as buttonVariants, d as useQueryClient, L as Link, B as Button } from "./index-DJ3jSp6d.js";
import { R as Root, W as WarningProvider, C as Content, c as composeEventHandlers, T as Title, D as Description, a as Close, b as createDialogScope, P as Portal, O as Overlay, d as createSlottable, e as createContextScope, f as Trigger, g as Dialog, h as DialogContent, i as DialogHeader, j as DialogTitle } from "./dialog-DPWmmY6-.js";
import { I as Input } from "./input-DUfuimul.js";
import { L as Label } from "./label-Bwc9BENV.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { u as ue } from "./index-Dsszj1e9.js";
import { S as StatusBadge } from "./StatusBadge-DYNS6d9D.js";
import { f as useAllMatches } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import { P as Plus, T as Trash2 } from "./trash-2-CrfEWxwg.js";
import { L as Lock } from "./lock-PPsfBIG9.js";
import "./badge-BuGF_AhT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const emptyForm = {
  name: "",
  entryFee: "",
  prizePool: "",
  scheduledAt: "",
  roomId: "",
  roomPassword: "",
  map: "Bermuda",
  gameMode: "Battle Royale",
  maxPlayers: "50"
};
function MatchForm({
  initial,
  onSubmit,
  onClose,
  loading
}) {
  const [form, setForm] = reactExports.useState(initial);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Match Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "bg-background border-border font-mono",
            value: form.name,
            onChange: set("name"),
            placeholder: "e.g. Friday Showdown",
            "data-ocid": "admin.match_form.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Entry Fee (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            className: "bg-background border-border font-mono",
            value: form.entryFee,
            onChange: set("entryFee"),
            placeholder: "50",
            "data-ocid": "admin.match_form.entry_fee_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Prize Pool (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            className: "bg-background border-border font-mono",
            value: form.prizePool,
            onChange: set("prizePool"),
            placeholder: "2000",
            "data-ocid": "admin.match_form.prize_pool_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Max Players" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            className: "bg-background border-border font-mono",
            value: form.maxPlayers,
            onChange: set("maxPlayers"),
            placeholder: "50",
            "data-ocid": "admin.match_form.max_players_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Scheduled Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "datetime-local",
            className: "bg-background border-border font-mono",
            value: form.scheduledAt,
            onChange: set("scheduledAt"),
            "data-ocid": "admin.match_form.scheduled_at_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "bg-background border-border font-mono",
            value: form.map,
            onChange: set("map"),
            placeholder: "Bermuda",
            "data-ocid": "admin.match_form.map_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Game Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "bg-background border-border font-mono",
            value: form.gameMode,
            onChange: set("gameMode"),
            placeholder: "Battle Royale",
            "data-ocid": "admin.match_form.game_mode_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Room ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "bg-background border-border font-mono",
            value: form.roomId,
            onChange: set("roomId"),
            placeholder: "Optional",
            "data-ocid": "admin.match_form.room_id_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-1.5 block", children: "Room Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "bg-background border-border font-mono",
            value: form.roomPassword,
            onChange: set("roomPassword"),
            placeholder: "Optional",
            "data-ocid": "admin.match_form.room_password_input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-mono",
          onClick: () => onSubmit(form),
          disabled: loading || !form.name || !form.entryFee || !form.scheduledAt,
          "data-ocid": "admin.match_form.submit_button",
          children: loading ? "Saving..." : "Save Match"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "border-border",
          onClick: onClose,
          "data-ocid": "admin.match_form.cancel_button",
          children: "Cancel"
        }
      )
    ] })
  ] });
}
function AdminMatchesPage() {
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editMatch, setEditMatch] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const { data: matches, isLoading } = useAllMatches();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "matches"] });
  const handleCreate = async (data) => {
    if (!actor) return;
    setSaving(true);
    try {
      await actor.createMatch({
        name: data.name,
        entryFee: Number.parseFloat(data.entryFee),
        prizePool: Number.parseFloat(data.prizePool),
        scheduledAt: data.scheduledAt,
        roomId: data.roomId || void 0,
        roomPassword: data.roomPassword || void 0,
        map: data.map,
        gameMode: data.gameMode,
        maxPlayers: Number.parseInt(data.maxPlayers)
      });
      await invalidate();
      setModalOpen(false);
      ue.success("Match created successfully");
    } catch {
      ue.error("Failed to create match");
    } finally {
      setSaving(false);
    }
  };
  const handleEdit = async (data) => {
    if (!actor || !editMatch) return;
    setSaving(true);
    try {
      await actor.updateMatch(editMatch.id, {
        name: data.name,
        entryFee: Number.parseFloat(data.entryFee),
        prizePool: Number.parseFloat(data.prizePool),
        scheduledAt: data.scheduledAt,
        roomId: data.roomId || void 0,
        roomPassword: data.roomPassword || void 0,
        map: data.map,
        gameMode: data.gameMode,
        maxPlayers: Number.parseInt(data.maxPlayers)
      });
      await invalidate();
      setEditMatch(null);
      ue.success("Match updated");
    } catch {
      ue.error("Failed to update match");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!actor || !deleteId) return;
    try {
      await actor.deleteMatch(deleteId);
      await invalidate();
      setDeleteId(null);
      ue.success("Match deleted");
    } catch {
      ue.error("Failed to delete match");
    }
  };
  const handleClose = async (matchId) => {
    if (!actor) return;
    try {
      await actor.closeMatch(matchId);
      await invalidate();
      ue.success("Match closed");
    } catch {
      ue.error("Failed to close match");
    }
  };
  const editFormData = editMatch ? {
    name: editMatch.name,
    entryFee: String(editMatch.entryFee),
    prizePool: String(editMatch.prizePool),
    scheduledAt: editMatch.scheduledAt,
    roomId: editMatch.roomId ?? "",
    roomPassword: editMatch.roomPassword ?? "",
    map: editMatch.map,
    gameMode: editMatch.gameMode,
    maxPlayers: String(editMatch.maxPlayers)
  } : emptyForm;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.matches.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "admin.matches.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display", children: "Matches" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "ml-auto bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm",
          size: "sm",
          onClick: () => setModalOpen(true),
          "data-ocid": "admin.matches.create_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " Create Match"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Fee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Prize" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center text-label text-muted-foreground", children: "Players" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["m0", "m1", "m2", "m3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 bg-muted" }) }, ck)) }, sk)) : !(matches == null ? void 0 : matches.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "td",
        {
          colSpan: 7,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "admin.matches.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm", children: "No matches yet. Create one!" })
          ]
        }
      ) }) : matches.map((match, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border hover:bg-muted/20 transition-colors",
          "data-ocid": `admin.matches.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: match.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                match.map,
                " · ",
                match.gameMode
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-primary", children: [
              "₹",
              match.entryFee
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-accent", children: [
              "₹",
              match.prizePool
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: new Date(match.scheduledAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-center font-mono text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: match.playerCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "/",
                match.maxPlayers
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: match.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              match.status === "open" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "h-7 w-7 text-muted-foreground hover:text-accent hover:bg-accent/10",
                  onClick: () => handleClose(match.id),
                  "aria-label": "Close match",
                  title: "Close match",
                  "data-ocid": `admin.matches.close.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10",
                  onClick: () => setEditMatch(match),
                  "aria-label": "Edit match",
                  "data-ocid": `admin.matches.edit_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                  onClick: () => setDeleteId(match.id),
                  "aria-label": "Delete match",
                  "data-ocid": `admin.matches.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              )
            ] }) })
          ]
        },
        match.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border max-w-lg",
        "data-ocid": "admin.matches.create_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-primary" }),
            " Create Match"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MatchForm,
            {
              initial: emptyForm,
              onSubmit: handleCreate,
              onClose: () => setModalOpen(false),
              loading: saving
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editMatch,
        onOpenChange: (open) => !open && setEditMatch(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "bg-card border-border max-w-lg",
            "data-ocid": "admin.matches.edit_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 text-primary" }),
                " Edit Match"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MatchForm,
                {
                  initial: editFormData,
                  onSubmit: handleEdit,
                  onClose: () => setEditMatch(null),
                  loading: saving
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteId,
        onOpenChange: (open) => !open && setDeleteId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AlertDialogContent,
          {
            className: "bg-card border-border",
            "data-ocid": "admin.matches.delete_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "font-display flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }),
                  " Delete Match"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This action is permanent. All related data will be removed." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "border-border",
                    "data-ocid": "admin.matches.delete_cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    onClick: handleDelete,
                    "data-ocid": "admin.matches.delete_confirm_button",
                    children: "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminMatchesPage as default
};
