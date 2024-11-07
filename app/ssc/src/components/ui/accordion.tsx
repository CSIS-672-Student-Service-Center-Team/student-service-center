'use client'

import React, {useState} from 'react'
import {ChevronDown} from 'lucide-react'
import {cn} from "@/lib/utils"

interface AccordionItemProps {
    value: string
    trigger: React.ReactNode
    children: React.ReactNode
}

interface AccordionProps {
    type?: 'single' | 'multiple',
    collapsible?: boolean,
    className?: string,
    children: React.ReactNode,
    value?: string[],
    onValueChange?: (value: (((prevState: string[]) => string[]) | string[])) => void
}

const AccordionContext = React.createContext<{
    expanded: string[]
    toggle: (value: string) => void
}>({
    expanded: [], toggle: () => {
    }
})

export function Accordion({
                              type = 'single',
                              collapsible = true,
                              className,
                              children,
                              value,
                              onValueChange
                          }: AccordionProps) {
    const [expanded, setExpanded] = useState<string[]>([])

    const toggle = (value: string) => {
        if (type === 'single') {
            setExpanded(expanded.includes(value) ? [] : [value])
        } else {
            setExpanded(
                expanded.includes(value)
                    ? expanded.filter(v => v !== value)
                    : [...expanded, value]
            )
        }
    }

    return (
        <AccordionContext.Provider value={{expanded, toggle}}>
            <div className={cn('space-y-2', className)}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
}

export function AccordionItem({value, trigger, children}: AccordionItemProps) {
    const {expanded, toggle} = React.useContext(AccordionContext)
    const isExpanded = expanded.includes(value)

    return (
        <div className="border rounded-lg">
            <button
                type="button"
                onClick={() => toggle(value)}
                className="flex w-full items-center justify-between px-4 py-2 text-left"
            >
                {trigger}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isExpanded && "rotate-180"
                    )}
                />
            </button>
            {isExpanded && (
                <div className="px-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    )
}

export function AccordionTrigger({children, className}: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("text-sm font-medium", className)}>
      {children}
    </span>
    )
}

export function AccordionContent({children}: { children: React.ReactNode }) {
    return <div className="text-sm">{children}</div>
}