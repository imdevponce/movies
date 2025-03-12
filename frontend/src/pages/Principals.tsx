import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Principal {
  id: number;
  category: string;
  characters: string[];
  tconst: string;
  nconst: string;
}

interface Name {
  nconst: string;
  name: string;
  birth_year: string;
  death_year: string | null;
  primary_professions: string;
}

const Principals: React.FC = () => {
  const { principalId, movieTitle } = useParams();
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [names, setNames] = useState<Name[]>([]);

  const formatRegularTitle = (slug: string | undefined | null): string => {
    if (!slug) {
      return "Unknown Movie";
    }
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getActorName = (nconst: string) => {
    const actor = names.find((name) => name.nconst === nconst);
    return actor ? actor.name : "Unknown Actor";
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/principals/").then((response) => {
      const filteredPrincipals = response.data.filter(
        (principal: Principal) => principal.tconst === principalId
      );
      setPrincipals(filteredPrincipals);
    });

    axios.get("http://127.0.0.1:8000/api/names/").then((response) => {
      setNames(response.data);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Principals for {formatRegularTitle(movieTitle)}
      </h2>

      {principals.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {principals.map((principal) => (
            <div
              key={principal.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {getActorName(principal.nconst)}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Role:</span> {principal.category}
              </p>
              {principal.characters && principal.characters.length > 0 && (
                <p className="text-gray-500">
                  <span className="font-medium">Characters:</span>{" "}
                  {principal.characters.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Principals;
