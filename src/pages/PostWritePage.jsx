import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import Swal from 'sweetalert2';
import OtherNav from '../components/atoms/OtherNav';
import BtnNavigate from '../components/molecules/BtnNavigate';
import OrderInfo from '../components/templates/OrderInfo';
import OrderRequest from '../components/templates/OrderRequest';
import OrderDeadLine from '../components/templates/OrderDeadLine';
import CircleNavigate from '../components/organisms/CircleNavigate';

const PostWritePage = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(1);
  let currentPage;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tip: 1000,
    },
  });

  const orderInfoValue = useWatch({
    control,
    name: ['store', 'beverage'],
  });

  const requestValue = useWatch({
    control,
    name: ['destination'],
  });

  const handlePrev = () => {
    if (focus > 1) {
      setFocus((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleAlert = () => {
    Swal.fire({
      title: '공고를 등록하시겠습니까?',
      html: `정보를 알맞게 입력하셨나요?<br/> 
      피커는 입력한 정보를 바탕으로 움직이게 됩니다.`,
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#0075FF',
      cancelButtonColor: '#D9D9D9',
      cancelButtonText: '취소',
      confirmButtonText: '확인',
    });
  };

  const handleNext = () => {
    if (focus === 1 && orderInfoValue[0] && orderInfoValue[1]) {
      setFocus((prev) => prev + 1);
    }
    if (focus === 2 && requestValue[0]) {
      setFocus((prev) => prev + 1);
    }
    if (focus === 3) handleAlert();
  };

  const onSubmit = (data) => {
    console.log(data); // api 연결 후 수정 예정
  };

  switch (focus) {
    case 1:
      currentPage = <OrderInfo register={register} storeError={!!errors.store} beverageError={!!errors.beverage} />;
      break;
    case 2:
      currentPage = <OrderRequest register={register} destinationError={!!errors.destination} />;
      break;
    case 3:
      currentPage = <OrderDeadLine register={register} deadLineError={!!errors.hour || !!errors.minute} />;
      break;
    default:
      currentPage = null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="page--layout flex flex-col justify-between">
        <div className="flex flex-col justify-start">
          <OtherNav />
          <CircleNavigate navigate={focus} />
          <div className="p-[35px]">{currentPage}</div>
        </div>
        <div className="mb-8">
          <BtnNavigate handlePrev={handlePrev} handleNext={handleNext} />
        </div>
      </div>
    </form>
  );
};

export default PostWritePage;
