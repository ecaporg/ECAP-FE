import * as React from 'react';

import { cn } from '@/utils';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  autoHeight?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, autoHeight, ...props }, ref) => (
    <div
      className={cn(
        'h-fit w-full overflow-x-clip rounded-lg border',
        autoHeight && 'max-h-[calc(100vh-var(--header-height)-2.5rem)]',
        className
      )}
    >
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-lg leading-[1.375rem]', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr_th:first-child]:rounded-tl-lg [&_tr_th:last-child]:rounded-tr-lg ',
      className
    )}
    {...props}
  />
));
//[&_tr_th:first-child]:border-l  [&_tr_th:last-child]:border-r [&_tr_th]:border-t
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child_td:first-child]:rounded-bl-lg ', className)}
    {...props}
  />
));
//[&_tr:last-child_td:last-child]:rounded-br-lg [&_tr_td:first-child]:border-l [&_tr_td:last-child]:border-r [&_tr:last-child_td]:border-b
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'p-3 text-left align-middle font-normal text-black lg:p-4 [&:has([role=checkbox])]:pr-0',
      'sticky top-0 text-nowrap',
      'bg-light-gray hover:bg-light-gray',
      'truncate',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'truncate p-3 align-middle text-neutral-black lg:p-4 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
    title={props.title ?? (typeof props.children === 'string' ? props.children : undefined)}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-muted-foreground text-sm', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const Span = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-block w-[calc(100%-1rem)] truncate align-middle font-normal',
        className
      )}
      {...props}
    />
  )
);
Span.displayName = 'Span';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Span,
};
