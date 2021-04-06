import styles from "../styles/Home.module.css";
export default function ClinetInfo(props) {
  return (
    <div>
      <p>
        <label>Client Name </label>
        <input
          id="clientName"
          name="clientName"
          type="text"
          onChange={props.handleStateChange}
        />
      </p>
      <p>
        <label>Client Address </label>
        <input
          id="clientAddress"
          name="clientAddress"
          type="text"
          onChange={props.handleStateChange}
        />
      </p>
      <p>
        <label>Client Phone </label>
        <input
          id="clientPhone"
          name="clientPhone"
          type="text"
          onChange={props.handleStateChange}
        />
      </p>
      <p>
        <label>Client Email </label>
        <input
          id="clientEmail"
          name="clientEmail"
          type="text"
          onChange={props.handleStateChange}
        />
      </p>
    </div>
  );
}
