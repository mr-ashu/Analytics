import { TopNItem } from "../Utils/fakeApi";
import "./TopNTable.css";

type Props = {
  data: TopNItem[];
};

const TopNTable = ({ data }: Props) => (
  <table className="topn-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.name}>
          <td>{row.name}</td>
          <td>{row.count}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TopNTable;
