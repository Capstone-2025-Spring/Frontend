import { useEffect, useRef, useState } from "react";
import { requestCriteriaRecommendation } from "../api/recommendation/criteria_recommand";
import "../css/CriteriaRecommendation.css";

const CriteriaRecommendation = ({ onClose, onSelect }) => {
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [selected, setSelected] = useState([]);
  const [lastSuggested, setLastSuggested] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    // 초기 인삿말
    setChatLog([
      {
        role: "gpt",
        text:
          "안녕! 나는 너의 선생님 스타일 추천 도우미야 😄\n" +
          "너는 어떤 사람이야? MBTI처럼 자기소개해줘!",
      },
    ]);
  }, []);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]); // ✅ chatLog가 변경될 때마다 아래로 스크롤

  const parseGptReply = (rawReply) => {
    const suggested = [];

    // ^^^^단어^^^^ 를 찾아서 배열에 저장하고, ^^^^ 제거
    const cleanedReply = rawReply.replace(
      /\^\^\^\^(.+?)\^\^\^\^/g,
      (_, word) => {
        const trimmed = word.trim();
        suggested.push(trimmed);
        return trimmed; // 표시 없이 원래 단어만 출력
      }
    );

    return {
      reply: cleanedReply.trim(),
      suggested,
    };
  };

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatLog((prev) => [...prev, { role: "user", text: userMessage }]);
    setChatInput("");

    // GPT 응답 받기
    const { reply: rawReply } = await requestCriteriaRecommendation(
      userMessage
    );
    const { reply, suggested } = parseGptReply(rawReply);

    // GPT 응답 저장
    setChatLog((prev) => [...prev, { role: "gpt", text: reply }]);
    setLastSuggested(suggested);

    // ✅ 여기서 selected 업데이트
    setSelected((prev) => [
      ...prev,
      ...suggested.filter((c) => !prev.includes(c)),
    ]);
  };

  const handleConfirm = () => {
    if (onSelect) onSelect(selected);
    if (onClose) onClose();
  };

  return (
    <div className="chat-popup-wrapper">
      <h2>GPT 추천 기준</h2>

      <div className="chat-box">
        {chatLog.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="답변을 입력하세요"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>전송</button>
      </div>
      <div className="chat-recommend-result">
        <h5>선택된 추천 기준:</h5>
        {selected.map((item, i) => (
          <span
            key={i}
            className="pill"
            onClick={() =>
              setSelected((prev) => prev.filter((_, index) => index !== i))
            }
            style={{ cursor: "pointer" }}
            title="클릭하여 삭제"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="chat-actions">
        <button onClick={handleConfirm}>이 기준들 추가</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CriteriaRecommendation;
