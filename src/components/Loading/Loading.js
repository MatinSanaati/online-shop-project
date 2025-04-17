// Style
import '../../styles/Loading/Loading.css';

export const Loading = () => {
    return (
        <div className="loading-scene">
            <div className="planet-container">
                <div className="planet"></div>
                <div className="ring ring1"></div>
                <div className="ring ring2"></div>
                <div className="pulse-glow"></div>
            </div>
            <div className="stars">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="star" />
                ))}
            </div>
        </div>
    );
};
