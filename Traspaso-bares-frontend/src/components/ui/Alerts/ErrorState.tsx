import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { getApiError } from "../../../api/apiError";

type ErrorStateProps = {
  error: unknown;
  title?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  error,
  title = "Ha ocurrido un error",
  onRetry,
}: ErrorStateProps) => {
  const { message } = getApiError(error);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <ReportProblemOutlinedIcon className="!text-5xl text-error" />

      <div>
        <h2 className="text-lg font-semibold text-error-strong">
          {title}
        </h2>

        <p className="mt-2 text-sm text-error-strong">
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-error px-4 py-2 text-white transition hover:bg-error-strong"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};