import styles from "../styles/Home.module.css";
export default function LineItems(props) {
  console.log("Got Here 1");
  return (
    <div id="bryan" className={styles.LineItems}>
      {props.state.lineItems.map((productLine, index) => {
        console.log("Got Here 2");
        return (
          <div key={index} className={styles.LineItem}>
            <div class="set-form">
  <table id="myTable" class="table table-bordered">
    <tr>
      <th>Question</th>
      <th>Answer</th>
    </tr>
    <tr>
      <td>
        <textarea name="Question" placeholder="Question" th:field="${questionAnswerSet.question}" id="question" style="resize: none; width: 100%;"></textarea>
      </td>
      <td>
        <textarea name="Answer" placeholder="Answer" th:field="${questionAnswerSet.answer}" id="answer" style="resize: none; width: 100%;"></textarea>
      </td>
    </tr>
  </table>
  <div class="set-form">
    <input type="button" id="more_fields" onclick="add_fields();" value="Add More" class="btn btn-info" />
</div>
            <input
              placeholder="Enter name/description"
              value={productLine.description}
              onChange={props.handleLineItemChange}
            />
            <input
              type="number"
              placeholder="0"
              value={productLine.cost}
              onChange={props.handleLineItemChange}
            />
            <button onClick={() => props.handleRemoveLineItem(i)}>
              Remove Row
            </button>
          </div>
        );
      })}
    </div>
  );
}
