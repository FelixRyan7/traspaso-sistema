import { formatSpanishDate } from "../../helpers/formatSpanishDate";


type Props = {
  from: string;
  to: string;
  locationName?: string;
  movementsCount: number;
  deliveredUnits: number;
};

export default function TransferHeader({
  from,
  to,
  locationName,
  movementsCount,
  deliveredUnits,
}: Props) {
  return (
    <section
      className="
        rounded-3xl
        bg-white-soft
        backdrop-blur-md
        shadow-sm
        p-6
      "
    >
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">
            Entregas
          </h1>
          <p className="mt-1 text-sm text-gray">{locationName}</p>

          <p className="mt-1 text-sm text-gray">
            {formatSpanishDate(from)} — {formatSpanishDate(to)}
          </p>
        </div>
          
        <div className="text-right">
          <p className="text-xl font-bold text-primary-strong">
            {movementsCount} movimientos
          </p>

          <p className="text-sm text-gray-dark">
             {deliveredUnits} unidades
          </p>
        </div>
      </div>
    </section>
  );
}