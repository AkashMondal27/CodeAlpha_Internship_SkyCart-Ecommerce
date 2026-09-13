import { useState,useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ShieldCheck, Send } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RequestAdminAccessDialog = ({ user, open, onOpenChange }) => {
  const [message, setMessage] = useState("");

  const [state, handleSubmit] = useForm("moeqojev");

  const submitForm = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      toast.error("Please explain why you need admin access.");
      return;
    }

    await handleSubmit(event);
  };

  useEffect(() => {
    if (state.succeeded) {
        toast.success("Admin access request sent successfully.");
        setMessage("");
        onOpenChange(false);
    }
}, [state.succeeded, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-2xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-xl">
                Request Admin Access
              </DialogTitle>

              <DialogDescription className="mt-1">
                Tell us why you need admin access. Your request will be
                reviewed manually.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={submitForm} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>

            <input
              type="text"
              name="name"
              value={user?.name || ""}
              readOnly
              className="w-full rounded-lg border bg-muted/50 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-lg border bg-muted/50 px-3 py-2.5 text-sm outline-none"
            />

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Why do you need admin access?
            </label>

            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain why you need admin access..."
              rows={5}
              required
              className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
            />

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={state.submitting}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />

              {state.submitting ? "Sending..." : "Send Request"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestAdminAccessDialog;