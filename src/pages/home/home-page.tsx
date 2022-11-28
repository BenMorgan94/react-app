import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import React, { RefObject } from "react";
import { Link } from "react-router-dom";
import { db, getUsername, logout } from "../../firebase/firebaseSetup";
import { ContentCard } from "../../interfaces/contentCard";
import "./home-page.scss";
import moment from "moment";

interface State {
  newContentCard: ContentCard;
  contentCards: ContentCard[];
}

export class HomePage extends React.Component<{}, State> {
  textInput: RefObject<HTMLInputElement>;
  userName: string;

  constructor(props: {}) {
    super(props);
    this.textInput = React.createRef();
    this.userName = "";
  }

  state = {
    newContentCard: {
      key: 0,
      text: "",
      userName: "",
      postedDate: "",
    },
    contentCards: [],
  };

  async componentWillMount() {
    const docQuery = await getDocs(collection(db, "newsfeed"));
    docQuery.forEach((doc) => {
      let card = doc.data() as ContentCard;
      this.setState((previousState) => ({
        contentCards: [
          {
            key: card.key,
            text: card.text,
            userName: card.userName,
            postedDate: card.postedDate,
          },
          ...previousState.contentCards,
        ],
      }));
    });
  }

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.userName.length === 0) {
      this.userName = getUsername();
    }

    this.setState({
      newContentCard: {
        key: Math.random(),
        text: event.target.value,
        userName: this.userName,
        postedDate: moment().format("LLL"),
      },
    });
  };

  postContent = async () => {
    this.setState((previousState) => ({
      newContentCard: {
        key: this.state.newContentCard.key,
        text: this.state.newContentCard.text,
        userName: this.state.newContentCard.userName,
        postedDate: this.state.newContentCard.postedDate,
      },
      contentCards: [
        ...previousState.contentCards,
        previousState.newContentCard,
      ],
    }));

    await addDoc(collection(db, "newsfeed"), {
      key: this.state.newContentCard.key,
      text: this.state.newContentCard.text,
      userName: this.state.newContentCard.userName,
      postedDate: this.state.newContentCard.postedDate,
    });

    this.textInput.current!.value = "";
  };

  deleteCard = async (event: any) => {
    const docQuery = await getDocs(collection(db, "newsfeed"));
    const currentCardText = event.target.parentNode.innerHTML.split("<")[0];

    //delete from state
    this.setState({
      contentCards: this.state.contentCards.filter(
        (contentCard: ContentCard) => {
          return contentCard.text !== currentCardText;
        }
      ),
    });

    // delete from DB
    docQuery.forEach((doc) => {
      let card = doc.data() as ContentCard;
      if (card.text === currentCardText) {
        deleteDoc(doc.ref);
      }
    });
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
                  <div className="date">{contentCard.postedDate}</div>
                  <div className="avatar">
                    {contentCard.userName?.slice(0, 2)}
                  </div>
                  <div className="text-and-button">
                    {contentCard.text}
                    <button className="delete" onClick={this.deleteCard}>
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
