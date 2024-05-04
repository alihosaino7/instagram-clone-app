import { Container } from "../components";
import RightSide from "../layout/RightSide";
import PostsList from "../components/PostsList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Container>
        <div className="flex py-8 justify-between">
          <PostsList />
          <RightSide />
        </div>
      </Container>
    </div>
  );
}
