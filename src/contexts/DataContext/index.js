import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {  
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
    
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

   // Nouvelle variable pour stocker la dernière donnée
  const [last, setLast] = useState (null); 


  // Modification de la fonction pour inclure la mise à jour de la variable last
  const getData = useCallback(async () => {
    try {
      // Modification du fetch pour importer les dernières données
      const fetchedData = await api.loadData();
      setData(fetchedData);
      // Mise à jour de la variable last avec la dernière donnée
      setLast(fetchedData.events[fetchedData.events.length - 1]);

    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, /* ajout de last  */
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);


export default DataContext;
