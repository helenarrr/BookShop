import CallAction from "./components/CallAction";
import Carousel from "./components/Carousel";
import ExploreBooks from "./components/ExploreBooks";
import LibraryServices from "./components/LibraryServices";

function HomePage() {
    return (
        <div>
            <ExploreBooks />
            <Carousel />
            <CallAction />
            <LibraryServices />
        </div>
    );
}

export default HomePage;
