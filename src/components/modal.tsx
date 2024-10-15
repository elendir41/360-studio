import * as React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '~/utils/cn';
import { Transition } from '@headlessui/react';

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
};

const Modal = ({ className, open, onClose, children }: ModalProps) => {
  return (
    <Transition show={open} as={React.Fragment}>
      <div className="fixed inset-0 z-30 overflow-y-auto py-4 lg:py-0" role="dialog" aria-modal="true">
        <div className="flex h-screen items-center justify-center px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/70 transition-opacity duration-300 ease-out" onClick={onClose} />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cn(
                'inline-block w-5/6 transform overflow-hidden rounded-lg bg-white p-6 text-left opacity-100 shadow-xl transition-all duration-300 ease-out sm:my-8 sm:max-w-2xl lg:w-full',
                className
              )}
            >
              <button
                type="button"
                className="absolute hidden rounded-md text-gray-400 transition hover:text-gray-500 sm:flex"
                onClick={onClose}
              >
                <Icon icon="iconamoon:close" className="h-8 w-8" />
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
