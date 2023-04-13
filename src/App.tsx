import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './App.css';

interface SelectionObject {
  selection: string | undefined,
  start: number,
  end: number,
  comment: string
}

const App = () => {
  const [selection, setSelection] = useState<string | undefined>("");
  const [selectionObj, setSelectionObj] = useState<SelectionObject>
    ({ selection: '', start: 0, end: 0, comment: '' });
  const [lastSelection, setLastSelection] = useState<string | undefined>("");
  const [commentToBeSaved, setCommentToBeSaved] = useState<string | "">("");
  const [comments, setComments] = useState<SelectionObject[]>([]);
  const [content, setContent] = useState<string[]>([]);

  useLayoutEffect(() => {
    let wholeText = document?.getElementById("text-for-selection")?.innerText!;
    let myStringArray = []
    for (let i = 0; i < wholeText?.length!; i++) {
      myStringArray.push(wholeText[i]);
    }
    setContent([...myStringArray]);
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", () => {
      const anchorOffset = window?.getSelection()?.anchorOffset ?? 0;
      const focusOffset = window?.getSelection()?.focusOffset ?? 0;

      const selectionString = window?.getSelection()?.toString();
      setSelection(selectionString);

      if (selectionString) {
        setLastSelection(selectionString);
        setSelectionObj({
          selection: window?.getSelection()?.toString(),
          start: Math.min(focusOffset, anchorOffset),
          end: Math.max(focusOffset, anchorOffset),
          comment: commentToBeSaved,
        });
      }
    });
  }, [selection, commentToBeSaved]);

  const handleAddComment = () => {
    if (!selectionObj.comment) {
      return;
    }
    setComments([...comments, { ...selectionObj }]);
    setCommentToBeSaved("");
  }

  const handleInputChange = (e: ChangeEvent<any>) => {
    e.preventDefault();
    setCommentToBeSaved(e.target.value);
    setSelectionObj({
      ...selectionObj,
      comment: e.target.value,
    });
  }

  return (
    <Container>
      <Stack gap={3}>

        {/* {comments.length > 0 ?
          comments.map(c => {
            // we need to map over the comments array to detect if we hit the start of the comment with start === index
            return content.map((item, index) => {
              if (c.start === index) {
                return <mark>{c.selection}</mark>
              } else if (c.end < index) {
                return null;
              } else {
                return item;
              }
            });
          }) :  */}
        {
          <div className="bg-light border" id="text-for-selection">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a vulputate ligula, in posuere nisl. Nullam in luctus nunc. Etiam at est ex. Maecenas interdum elementum nisl vitae gravida. Quisque ac lacus tincidunt, convallis est quis, porta mauris. Mauris ut dapibus nisi. Proin iaculis interdum libero, non pharetra eros mattis non. Proin vel velit blandit, elementum est nec, lacinia mi. Phasellus dapibus, neque at sagittis lobortis, urna felis condimentum tortor, mattis sagittis lacus ligula ut risus. Cras ac tempor turpis, nec condimentum purus. Nullam ullamcorper pharetra tempor. Vivamus dapibus congue rhoncus. Etiam eu pulvinar est. Nam rhoncus, ipsum ut pulvinar vehicula, libero metus convallis est, sed tristique elit justo eget purus.

            Nulla bibendum in diam ac laoreet. Etiam egestas nibh ac neque porta tristique. Integer vel porttitor nisl. Vivamus laoreet turpis a lacus hendrerit, a ultricies leo aliquet. Quisque et nisi ligula. Nullam quis dolor vel purus tempor laoreet. Aenean mattis risus sit amet mi hendrerit finibus. In hac habitasse platea dictumst. Vestibulum at leo imperdiet, lobortis orci at, scelerisque neque. Fusce urna sem, laoreet in leo sit amet, venenatis blandit leo. Maecenas vitae odio quis augue egestas tristique. Sed purus arcu, euismod at facilisis et, laoreet id dolor. Nulla a dui hendrerit, fringilla diam id, placerat erat.

            Vivamus justo nisi, eleifend id massa in, pharetra volutpat lorem. Curabitur eu ex vitae ex pharetra sagittis sit amet ut ligula. Cras nunc felis, placerat ut lacus non, facilisis fermentum lorem. Etiam a leo id lorem lacinia bibendum. Fusce auctor lorem ac purus finibus euismod. Pellentesque eu massa at sem feugiat cursus. Sed commodo dolor vitae dignissim vehicula. Nam eu erat malesuada, euismod ligula a, faucibus tortor. Ut a tellus hendrerit, pulvinar elit eget, varius odio.

            In id sollicitudin mauris. Sed congue viverra pretium. Donec et lectus nisi. Sed imperdiet ipsum et semper eleifend. Aliquam tempor, augue sit amet vulputate auctor, nisi nisi tristique odio, in pharetra leo lacus a purus. Sed vel nibh ex. Praesent aliquam justo ante. Aenean sagittis in lacus non lacinia. Nam tellus massa, imperdiet sed dui id, pharetra congue enim. Fusce commodo lacus nisi, sed euismod nisl condimentum vitae. Duis elementum dapibus urna, et lacinia lorem dictum eu. Duis hendrerit ante vitae efficitur sodales.
          </div>}

        <div className="bg-light border">To add a comment, select some text above and add your comment to following input to be saved.
        </div>
        <div className="bg-light border">
          Commenting for:  {lastSelection}
        </div>
        <InputGroup>
          <InputGroup.Text>Your comment to be added</InputGroup.Text>
          <Form.Control onChange={handleInputChange} value={commentToBeSaved} as="textarea" aria-label="With textarea" />
        </InputGroup>
        {lastSelection ? <Button onClick={handleAddComment}>Add a new comment</Button> : null}
        {comments.length > 0 && comments.map(({ selection, comment }, index) => {
          console.log(comment + "for" + selection)
          return <div key={`${Math.random()}-comment-selection`}>
            <mark>{selection}</mark>
            <div>{comment}</div>
          </div>;
        }
        )}
        {/* {comments.map((item, index) => <Highlight text={item} key={index}></Highlight>)} */}
      </Stack>
    </Container >
  );
}

export default App;
