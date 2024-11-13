import { useEffect, useState } from 'react';

import { Mail } from '@/components/chat/mail/mail';
import { accounts, mails } from './data';

export default function MailPage() {
  // Initialize state for layout and collapsed using React's useState
  const [defaultLayout, setDefaultLayout] = useState();
  const [defaultCollapsed, setDefaultCollapsed] = useState();

  // Retrieve layout and collapsed state from localStorage on component mount
  useEffect(() => {
    const layout = localStorage.getItem('react-resizable-panels:layout:mail');
    const collapsed = localStorage.getItem('react-resizable-panels:collapsed');

    if (layout) setDefaultLayout(JSON.parse(layout));
    if (collapsed) setDefaultCollapsed(JSON.parse(collapsed));
  }, []);

  // Save layout and collapsed state to localStorage when they change
  useEffect(() => {
    if (defaultLayout)
      localStorage.setItem(
        'react-resizable-panels:layout:mail',
        JSON.stringify(defaultLayout)
      );
  }, [defaultLayout]);

  useEffect(() => {
    if (defaultCollapsed)
      localStorage.setItem(
        'react-resizable-panels:collapsed',
        JSON.stringify(defaultCollapsed)
      );
  }, [defaultCollapsed]);

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <img
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
