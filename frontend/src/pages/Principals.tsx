import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, decryptData, encryptData } from "../utils";
import PrincipalCard from "../components/PrincipalCard";
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
  const [loading, setLoading] = useState(true);
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
    const cachedPrincipals = sessionStorage.getItem("principals");
    const cachedNames = sessionStorage.getItem("names");

    if (cachedPrincipals && cachedNames) {
      const decryptedPrincipals = decryptData(cachedPrincipals);
      const decryptedNames = decryptData(cachedNames);
      setPrincipals(
        decryptedPrincipals.filter(
          (principal: Principal) => principal.tconst === principalId
        )
      );
      setNames(decryptedNames);
      setLoading(false);
    } else {
      axios
        .get(API_URL + "/api/principals/")
        .then((response) => {
          const filteredPrincipals = response.data.filter(
            (principal: Principal) => principal.tconst === principalId
          );
          setPrincipals(filteredPrincipals);
          const encryptedPrincipals = encryptData(response.data);
          sessionStorage.setItem("principals", encryptedPrincipals);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });

      axios
        .get(API_URL + "/api/names/")
        .then((response) => {
          setNames(response.data);
          const encryptedNames = encryptData(response.data);
          sessionStorage.setItem("names", encryptedNames);
          setLoading(false);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [principalId]);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2
        className="text-2xl font-bold text-gray-800 mb-6"
        id="movie-title"
        tabIndex={0}
      >
        Principals for {formatRegularTitle(movieTitle)}
      </h2>

      {principals.length === 0 ? (
        <p className="text-gray-500" aria-live="polite" role="status">
          No data available.
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          aria-labelledby="movie-title"
        >
          {principals.map((principal) => (
            <PrincipalCard
              key={principal.id}
              principal={principal}
              actorName={getActorName(principal.nconst)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Principals;
