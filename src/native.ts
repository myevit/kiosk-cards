import { LitElement, html, nothing } from "lit";
export async function nativeComponents(
  required = ["ha-dialog", "ha-button", "ha-dialog-footer", "ha-form"],
) {
  if (required.every((t) => customElements.get(t))) return;
  const helpers = await (window as any).loadCardHelpers?.();
  if (!helpers) throw Error("Home Assistant controls are unavailable");
  const card = await helpers.createCardElement({
    type: "entities",
    entities: [],
  });
  await card.constructor.getConfigElement?.();
  if (!required.every((t) => customElements.get(t)))
    throw Error("Home Assistant controls are unavailable");
}
export function confirmAction(
  node: HTMLElement,
  params: any,
): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (yes: boolean) => {
      if (!settled) {
        settled = true;
        resolve(yes);
      }
    };
    node.dispatchEvent(
      new CustomEvent("show-dialog", {
        bubbles: true,
        composed: true,
        detail: {
          dialogTag: "kiosk-confirmation-dialog",
          dialogImport: () =>
            nativeComponents().catch((e) => {
              finish(false);
              throw e;
            }),
          dialogParams: {
            ...params,
            confirm: () => finish(true),
            cancel: () => finish(false),
          },
        },
      }),
    );
  });
}
export class KioskConfirmationDialog extends LitElement {
  static properties = { open: { state: true }, params: { state: true } };
  open = false;
  params: any;
  async showDialog(params: any) {
    await nativeComponents();
    this.params = params;
    this.open = true;
    await this.updateComplete;
  }
  closeDialog() {
    this.finish(false);
    return true;
  }
  private finish(confirmed: boolean) {
    if (!this.open) return;
    this.open = false;
    (confirmed ? this.params.confirm : this.params.cancel)();
    this.dispatchEvent(
      new CustomEvent("dialog-closed", {
        bubbles: true,
        composed: true,
        detail: { dialog: this.localName },
      }),
    );
  }
  render() {
    if (!this.params) return nothing;
    return html`<ha-dialog
      .open=${this.open}
      header-title=${this.params.title || "Confirm action"}
      @closed=${() => this.finish(false)}
      ><p>${this.params.text || "Run this action?"}</p>
      <ha-dialog-footer slot="footer"
        ><ha-button
          slot="secondaryAction"
          appearance="plain"
          @click=${() => this.finish(false)}
          >${this.params.dismiss_text || "Cancel"}</ha-button
        ><ha-button slot="primaryAction" @click=${() => this.finish(true)}
          >${this.params.confirm_text || "Confirm"}</ha-button
        ></ha-dialog-footer
      ></ha-dialog
    >`;
  }
}
if (!customElements.get("kiosk-confirmation-dialog"))
  customElements.define("kiosk-confirmation-dialog", KioskConfirmationDialog);
