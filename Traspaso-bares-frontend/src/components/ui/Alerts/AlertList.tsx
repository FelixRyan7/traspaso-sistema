import { Alert} from './Alert';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export type AlertMessage = {
  id: number | string;
  type: AlertType;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
};

type AlertListProps = {
  messages: AlertMessage[];
  onClose: (id: number | string) => void;
  floating?: boolean;
};

export const AlertList = ({
  messages,
  onClose,
  floating = false,
}: AlertListProps) => {
  return (
    <div
      className={`
        flex flex-col gap-2
        ${floating
    ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm md:left-auto md:right-4 md:translate-x-0 z-[70]'
    : 'w-full'
  }
      `}
    >
      {messages.map((msg) => (
        <Alert
          key={msg.id}
          type={msg.type}
          icon={msg.icon}
          closable
          autoClose={6000}
          onClose={() => onClose(msg.id)}
        >
          {msg.content}
        </Alert>
      ))}
    </div>
  );
};