"use client";

import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

function useCollapsible() {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible sub-components must be used within a <Collapsible />");
  }
  return context;
}

interface CollapsibleProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({ children, defaultOpen = false, className }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <CollapsibleContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function CollapsibleTrigger({ children, className, ...props }: CollapsibleTriggerProps) {
  const { isOpen, setIsOpen } = useCollapsible();

  return (
    <button type="button" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen} className={className} {...props}>
      {children}
    </button>
  );
}

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CollapsibleContent({ children, className }: CollapsibleContentProps) {
  const { isOpen } = useCollapsible();

  return (
    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} ${className}`}>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function CollapsibleChevron({ className }: { className?: string }) {
  const { isOpen } = useCollapsible();
  return <ChevronDown size={16} className={`transform transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""} ${className}`} />;
}
