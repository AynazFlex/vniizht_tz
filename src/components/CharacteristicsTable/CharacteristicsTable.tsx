import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import style from "./CharacteristicsTable.module.css";
import { ICharacteristic } from "../../store/reducer/data/dataSlice.types";
import { useAppDispatch } from "../../store/hooks";
import { setCharacteristics } from "../../store/reducer/data/dataSlice";

interface IProps {
  trainName: string;
  characteristics: ICharacteristic[];
}

type TTypes = "engineAmperage" | "force" | "speed";

const CharacteristicsTable: FC<IProps> = memo(
  ({ trainName, characteristics }) => {
    const [item, setItem] = useState<ICharacteristic[]>([]);
    const valid = useRef(new Set<string>());
    const dispatch = useAppDispatch();

    useEffect(() => {
      valid.current.clear();
      setItem([...characteristics]);
    }, [trainName, JSON.stringify(characteristics)]);

    const handleChange =
      (index: number, type: TTypes, pattern: RegExp) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const isValid = pattern.test(value) && String(+value) === value;
        valid.current[isValid ? "delete" : "add"](`${type}-${index}`);
        setItem((prev) =>
          prev.map((item, i) =>
            index === i
              ? {
                  ...item,
                  [type]: isValid ? +value : value,
                }
              : item
          )
        );
      };

    const handleSubmit = () => {
      const sortCharacter = [...item].sort((a, b) => a.speed - b.speed);

      console.log(sortCharacter);
      dispatch(setCharacteristics(sortCharacter));
    };

    const invalidClass = (isValid: boolean, className: string) => {
      if (isValid) return className;
      return;
    };

    return (
      <div>
        <h2>Характеристики {trainName}</h2>
        <table>
          <thead>
            <tr>
              <th>Ток двигателя</th>
              <th>Сила тяги</th>
              <th>Скорость</th>
            </tr>
          </thead>
          <tbody>
            {item.map(({ speed, force, engineAmperage }, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={invalidClass(
                      valid.current.has(`engineAmperage-${index}`),
                      style.invalid
                    )}
                    value={engineAmperage}
                    onChange={handleChange(
                      index,
                      "engineAmperage",
                      /^[1-9]\d*$/
                    )}
                  />
                </td>
                <td>
                  <input
                    className={invalidClass(
                      valid.current.has(`force-${index}`),
                      style.invalid
                    )}
                    value={force}
                    onChange={handleChange(index, "force", /^\d+\.?\d+$/)}
                  />
                </td>
                <td>
                  <input
                    className={invalidClass(
                      valid.current.has(`speed-${index}`),
                      style.invalid
                    )}
                    value={speed}
                    onChange={handleChange(index, "speed", /^\d+$/)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSubmit}
          disabled={
            !!valid.current.size ||
            JSON.stringify(item) === JSON.stringify(characteristics)
          }
        >
          Отправить данные
        </button>
      </div>
    );
  }
);

export default CharacteristicsTable;
