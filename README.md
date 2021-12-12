# react-konva-image-editor

<center>
<img src="images/logo.png" width="200">
</center>

## Subject

> - HTML5 Canvas 기반 오픈소스 이미지 에디터 라이브러리 개발
> - Opensource Image Editor Library Development based on HTML5 Canvas

- 본 프로젝트는 2021-2학기 경희대학교 캡스톤 디자인 1 - 산업체 주제(모바일 앱개발 협동조합)를 바탕으로 개발했습니다.

## Members

- 정종윤(@wormwlrm)

## Abstract

> HTML5부터 등장한 Canvas API를 이용하면 웹에서도 이미지 편집을 비롯한 다양한 그래픽 기술을 처리할 수 있다.
> 하지만 기본적으로 제공하는 API의 추상화 단계가 낮고, 그래픽 도메인에 대한 지식을 별 도로 학습해야 한다는 단점이 있다.
> 따라서 대부분의 경우에는 Canvas API를 직접 활용하기보다는 완성 된 라이브러리를 활용하는 방법을 선택한다.
>
> 본 논문에서는 이미지 편집에 초점을 맞추어, 2D 그래픽 기반의 Canvas API를 활용한 오픈소스 이미지 에디터를 구현한다.
> 이미지 에디터에서 제공하는 다양한 편집 기능들을 어떠한 Canvas API와 디자인 패턴으로 구현 가능한지를 연구하고, 이 과정에서 마주치는 한계점들을 극복하는 방안에 대해 알아본다.

## Overview

![demo](images/demo.gif)

> 별도 제작한 [데모 페이지](https://wormwlrm.github.io/react-konva-image-editor-demo)에서 동작하는 예시를 확인할 수 있습니다.

본 프로젝트에서는 다음과 같은 기능을 지원합니다. 기능에 대한 자세한 설명은 아래에서 확인할 수 있습니다.

- [x] 라이브러리 형태로 패키지 릴리스
- [x] 호스트 옵션 제공
- [x] 이미지/도형 컴포넌트 생성 및 편집
- [x] 실행 취소/다시 실행
- [x] 드로잉
- [x] 수정 가능한 텍스트 컴포넌트 제공
- [x] 캔버스 확대 및 축소
- [x] 컴포넌트 복제/삭제
- [x] Z-index 조정
- [x] 이미지 저장
- [x] 직렬화를 이용한 수정 내역 저장 및 복원 기능

### Motivation

직접 제작하는 것을 목표로 개발했습니다.

### Concept

추상화
상태관리
라이브러리

### Features

본 프로젝트에서는 다음과 같은 기능을 지원합니다.

- [x] 라이브러리 형태로 패키지 릴리스

```bash
$ npm install react-konva-image-editor
# or
$ yarn add react-konva-image-editor
```

```js
// App.js
import { Editor } from 'react-konva-image-editor';

return (
  <Editor />
);
```

- [x] 호스트 옵션 제공

```js
return (    
<Editor
  width={800}
>)

```  

- [x] 이미지/도형 컴포넌트 생성 및 편집
- [x] 실행 취소/다시 실행
- [x] 드로잉
- [x] 수정 가능한 텍스트 컴포넌트 제공
- [x] 캔버스 확대 및 축소
- [x] 컴포넌트 복제/삭제
- [x] Z-index 조정
- [x] 이미지 저장
- [x] 직렬화를 이용한 수정 내역 저장 및 복원 기능

## Results

- Main code, table, graph, comparison, ...
- Web URL

## Conclusion & Limitations

- 있었습니다.
-

- Summary, Future plan, ...

## References

### Papers

- [장석우, 허문행, HTML5 캔버스를 이용한 플랫폼 독립적인 게임의 구현, 한국정보통신학회논문지, 제18권, 제12호, pp. 3042-3048, 2014](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001946202)
- [박영수, HTML5에서 직선의 기울기를 이용한 2D to 3D 입체 이미지 변환, 디지털융복합연구, 제12권, 제12호, pp. 521-528, 2014](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001939840)
- [박미라, 박기호, 안재성, HTML5 Canvas를 활용한 시각적 공간분석 환경의 설계와 구현, 한국지리정보학회지, 제14권, 제4호, pp.44-53, 2011](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001615401)

### Others

- [Vitaly Friedman, Smashing Book 6: New. Frontiers In Web Design, 2018](https://www.smashingmagazine.com/2018/09/smashing-book-6-release/)
- [Konva.js](https://konvajs.org/)
- [React.js](https://reactjs.org/)
- [Rollup.js](https://rollupjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 보고서

<img src="images/paper.png" width="300">

_해당 논문은 한국정보과학회 학부생 논문경진대회 본선 진출작입니다._

- [최종보고서](reports/Final.pdf)
- [한국정보과학회 논문](reports/HTML5_Canvas_기반_오픈소스_이미지_에디터_라이브러리_개발.pdf)
- [한국정보과학회 학부생경진대회 발표영상](reports/304_정종윤(경희대학교).mp4)
