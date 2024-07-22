import { FC, memo } from "react";
import { IData } from "../../store/reducer/data/dataSlice.types";
import { useAppDispatch } from "../../store/hooks";
import { setTrainName } from "../../store/reducer/data/dataSlice";

interface IProps {
  data: IData[];
}

const TrainsTable: FC<IProps> = memo(({ data }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Поезда</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, description, characteristics }) => (
            <tr
              onClick={() =>
                dispatch(
                  setTrainName({
                    trainName: name,
                    characteristics,
                  })
                )
              }
              key={name}
            >
              <td>{name}</td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default TrainsTable;
