interface Props {
  principal: {
    id: number;
    category: string;
    characters: string[];
    tconst: string;
    nconst: string;
  };
  actorName: string;
}
const PrincipalCard = ({ principal, actorName }: Props) => {
  return (
    <div
      key={principal.id}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
      aria-labelledby={`principal-${principal.id}`}
    >
      <h3
        id={`principal-${principal.id}`}
        className="text-lg font-semibold text-gray-700"
        tabIndex={0}
      >
        {actorName}
      </h3>
      <p className="text-gray-600">
        <span className="font-medium">Role:</span> {principal.category}
      </p>
      {principal.characters && principal.characters.length > 0 ? (
        <p className="text-gray-500">
          <span className="font-medium">Characters:</span>{" "}
          {principal.characters.join(", ")}
        </p>
      ) : null}
    </div>
  );
};

export default PrincipalCard;
