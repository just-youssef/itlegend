"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';

const CustomModal = ({
  open,
  children,
  onClose,
  className,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto v-scrollbar">
          <TransitionChild
            as={`div`}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            className="flex min-h-full items-center justify-center p-8"
          >
            <DialogPanel
              as="div"
              className={`${className} w-full overflow-hidden rounded-lg bg-gray-50 z-50 relative flex flex-col`}
            >
              {children}
              <button
                type="button"
                className="absolute right-1 top-1 rounded-full p-1 z-50 danger-icon-btn"
                onClick={onClose}
              >
                <IoMdCloseCircle fontSize={20} />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomModal