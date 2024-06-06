import { Event as EventModel } from "../models/event";
import { formatDate } from "../utils/formatDate";
import { MdDelete, MdEditSquare } from "react-icons/md";

interface EventProps {
  event: EventModel;
  className?: string;
  index: number;
  onDeleteEventClicked: (event: EventModel) => void;
  onEventClicked: (event: EventModel) => void;
}

const Event = ({
  event,
  className,
  index,
  onDeleteEventClicked,
  onEventClicked,
}: EventProps) => {
  let createdUpdatedText: JSX.Element;

  if (event.updatedAt > event.createdAt) {
    createdUpdatedText = (
      <>
        Updated: <br />
        {formatDate(event.updatedAt)}
      </>
    );
  } else {
    createdUpdatedText = (
      <>
        Created: <br />
        {formatDate(event.updatedAt)}
      </>
    );
  }

  const isEven = index % 2 === 0;

  return (
    <div
      key={index}
      className={`p-6 rounded-lg shadow-md flex gap-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${
        isEven ? "bg-purple-100" : "bg-green-100"
      }`}
    >
      <div
        className={`flex-shrink-0 ${
          isEven ? "text-purple-600" : "text-green-600"
        }`}
      >
        <div className="text-sm">{createdUpdatedText}</div>
        <h2 className="text-2xl font-semibold">{event.title}</h2>
      </div>
      <div
        className={`w-0.5 ${isEven ? "bg-purple-600" : "bg-green-600"}`}
      ></div>
      <div className="flex-grow">
        <p className="text-gray-700">{event.text}</p>
      </div>
      <div className="text-xl flex flex-col cursor-pointer justify-between">
        <MdDelete
          onClick={(e) => {
            onDeleteEventClicked(event);
            e.stopPropagation();
          }}
        />
        <MdEditSquare 
          onClick={() => onEventClicked(event)}
        />
      </div>
    </div>
  );
};

export default Event;
