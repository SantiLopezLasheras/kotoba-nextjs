// import { Tarjeta } from "@/app/lib/definitions";
// import { TarjetaCard } from "./TarjetaCard";
// import { Pagination } from "./ui/pagination";

// interface TarjetaListProps {
//   tarjetas: Tarjeta[];
//   onCardClick: (tarjeta: Tarjeta) => void;
//   onEditCard: (tarjeta: Tarjeta) => void;
//   onDeleteCard: (tarjeta: Tarjeta) => void;
// }

// export const TarjetaList: React.FC<TarjetaListProps> = ({
//   tarjetas,
//   onCardClick,
//   onEditCard,
//   onDeleteCard,
// }) => (
//   <div>
//     <ul id="card-list" className="space-y-4">
//       {tarjetas.map((tarjeta) => (
//         <TarjetaCard
//           key={tarjeta.card_id}
//           tarjeta={tarjeta}
//           onClick={() => onCardClick(tarjeta)}
//           onEdit={() => onEditCard(tarjeta)}
//           onDelete={() => onDeleteCard(tarjeta)}
//         />
//       ))}
//     </ul>
//     <Pagination>
//       <Pagination.Content>
//         <Pagination.Item>
//           <Pagination.Previous href="#" />
//         </Pagination.Item>
//         <Pagination.Item>
//           <Pagination.Link href="#">1</Pagination.Link>
//         </Pagination.Item>
//         <Pagination.Item>
//           <Pagination.Ellipsis />
//         </Pagination.Item>
//         <Pagination.Item>
//           <Pagination.Next href="#" />
//         </Pagination.Item>
//       </Pagination.Content>
//     </Pagination>
//   </div>
// );
