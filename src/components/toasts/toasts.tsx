import ReactDOM from "react-dom/client";
import Toast, { ToastProps } from "../toast/toast";
import "./toasts.scss";

interface ToastOptions {
  id?: string;
  title: string;
  content: string;
  duration?: number;
}

export class Toasts {
  private containerRef: HTMLDivElement;
  private toasts: ToastProps[] = [];
  private renderContainer: ReactDOM.Root | undefined;

  constructor() {
    const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    const toastContainer = document.createElement("div") as HTMLDivElement;
    toastContainer.id = "toast-container-main";
    body.insertAdjacentElement("beforeend", toastContainer);
    this.containerRef = toastContainer;
  }

  public show(options: ToastOptions): void {
    const toastId = Math.random().toString(36).substring(2, 9);
    const toast: ToastProps = {
      id: toastId,
      ...options, // if id is passed within options, it will overwrite the auto-generated one
      destroy: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps) => (
      <Toast key={toastProps.id} {...toastProps} />
    ));
    if (!this.renderContainer) {
      this.renderContainer = ReactDOM.createRoot(this.containerRef);
    }
    this.renderContainer.render(toastsList);
  }
}

export const toast = new Toasts();
