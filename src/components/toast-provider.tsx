'use client';

import * as React from 'react';
import type { AriaToastRegionProps } from '@react-aria/toast';
import type { ToastState } from '@react-stately/toast';
import { useToastRegion } from '@react-aria/toast';
import type { AriaToastProps } from '@react-aria/toast';
import { useToast } from '@react-aria/toast';
import { ToastQueue, useToastQueue } from '@react-stately/toast';
import { createPortal } from 'react-dom';

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

function Toast<T extends React.ReactNode>({ state, ...props }: ToastProps<T>) {
  const ref = React.useRef(null);
  const { toastProps, titleProps, closeButtonProps } = useToast(props, state, ref);

  return (
    <div {...toastProps} ref={ref} className="toast">
      <div {...titleProps}>{props.toast.content}</div>
      {props.toast.onClose && <button {...closeButtonProps}>x</button>}
    </div>
  );
}

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

function ToastRegion<T extends React.ReactNode>({ state, ...props }: ToastRegionProps<T>) {
  const ref = React.useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className="toast-region fixed bottom-0 right-0 z-50 p-4">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}

// Create a global toast queue.
export const toastQueue = new ToastQueue<React.ReactNode>({
  maxVisibleToasts: 5,
});

export function GlobalToastRegion(props) {
  // Subscribe to it.
  const state = useToastQueue(toastQueue);

  // Render toast region.
  return state.visibleToasts.length > 0 ? createPortal(<ToastRegion {...props} state={state} />, document.body) : null;
}
