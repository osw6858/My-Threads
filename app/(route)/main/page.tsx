const MainPage = () => {
  return (
    <div>
      메인페이지
      {/* NOTIC: 테스트 컴포넌트 Suspense와 반드시 같이 써야함
        <Suspense fallback={<div>로딩중</div>}>
          <Test />
        </Suspense> 
      */}
    </div>
  );
};

export default MainPage;
