import React, { RefObject } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/firebaseSetup";
import { ContentCard } from "../../interfaces/contentCard";
import "./home-page.scss";

interface State {
  newContentCard: ContentCard;
  contentCards: ContentCard[];
}

export class HomePage extends React.Component<{}, State> {
  textInput: RefObject<HTMLInputElement>;

  constructor(props: {}) {
    super(props);
    this.textInput = React.createRef(); // Refactor this ref stuff, not nice >:(
  }

  state = {
    newContentCard: {
      key: 0,
      text: "",
    },
    contentCards: [],
  };

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newContentCard: {
        key: Math.random(),
        text: event.target.value,
      },
    });
  };

  postContent = () => {
    this.setState((previousState) => ({
      newContentCard: {
        key: this.state.newContentCard.key,
        text: this.state.newContentCard.text,
      },
      contentCards: [
        ...previousState.contentCards,
        previousState.newContentCard,
      ],
    }));

    this.textInput.current!.value = "";
  };

  render() {
    return (
      <div className="homepage">
        <div className="sidemenu">
          <Link to="/">
            <button onClick={logout}>Logout</button>
          </Link>
        </div>
        <div className="content">
          <div className="newsfeed-container">
            <div className="editable-content">
              <input ref={this.textInput} onChange={this.inputChange}></input>
              <button
                disabled={
                  this.textInput.current?.value === "" ||
                  this.textInput.current?.value === undefined
                }
                onClick={this.postContent}
              >
                Post
              </button>
            </div>
            <div className="posted-content">
              {this.state.contentCards.map((contentCard: ContentCard) => (
                <div className="content-card" key={contentCard.key}>
                  {contentCard.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
