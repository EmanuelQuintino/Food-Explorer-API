import styled from "styled-components";

export const Container = styled.div`
  .box {
    padding: 2.4rem 0;
    position: relative;
  }
  
  .rectangle {
    width: 100%;
    height: 12.0rem;
    transform: translateX(2%);
  }

  .macaronLogo {
    position: absolute;
    width: 17.0rem;
    height: 14.2rem;
    left: -1.2rem;
    bottom: 2.75rem;
  }
  
  .slogan {
    width: 60%;
    position: absolute;
    bottom: 5.6rem;
    right: -2.0rem;
    
    h2 {
      color: ${({ theme }) => theme.colors.light300};
      font-size: 1.8rem;
    }
    
    p {
      color: ${({ theme }) => theme.colors.light300};
      font-size: 1.2rem;
    }
  }

  @media (min-width: 590px) {    
    .slogan {
      width: 50%;
      top: 35%;
      left: 42%;
      
      h2 {
        font-size: 2.4rem;
      }
      
      p {
        font-size: 1.4rem;
      }
    }
  }

  @media (min-width: 640px) {
    .box {
      padding: 2.4rem;
      position: relative;
    }
    
    .rectangle {
      width: 100%;
      height: auto;
      transform: translateX(0%);
    }

    .macaronLogo {
      width: 42%;
      height: auto;
    }
    
    .slogan {
      width: auto;
      top: 35%;
      left: 42%;
      
      h2 {
        font-size: 2.8rem;
      }
      
      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (min-width: 745px) {
    .slogan {
      width: 50%;
      top: 35%;
      left: 42%;
      
      h2 {
        font-size: 2.8rem;
      }
      
      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (min-width: 810px) {    
    .slogan {
      h2 {
        font-size: 3.6rem;
      }
      
      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (min-width: 1100px) {    
    .slogan {
      left: 50%;

      h2 {
        font-size: 4.2rem;
      }
      
      p {
        font-size: 1.8rem;
      }
    }
  }
`;