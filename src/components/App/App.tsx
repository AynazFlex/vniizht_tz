import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import style from "./App.module.css";
import { getData } from "../../store/reducer/data/dataSlice";
import TrainsTable from "../TrainsTable/TrainsTable";
import CharacteristicsTable from "../CharacteristicsTable/CharacteristicsTable";

const App = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, trainName, characteristics } = useAppSelector(
    (state) => state.data
  );

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (isLoading) {
    return <div className={style.loading}>loading...</div>;
  }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <div className={style.app}>
      <TrainsTable data={data} />
      {trainName && (
        <CharacteristicsTable
          trainName={trainName}
          characteristics={characteristics}
        />
      )}
    </div>
  );
};

export default App;
