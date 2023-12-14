function CallAction() {
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>

                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>

                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Без книги – в мире ночь, без книги мрак кругом. (В. Гюго)</h1>
                            <a type='button' className='btn main-color btn-lg text-white'
                                href='/search'>Перейти к поиску</a>
                        </div>
                    </div>
                </div>

                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                          justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>В книге – память человеческого рода, она – рупор человеческой мысли. (В. Розанов)</h1>
                            <a type='button' className='btn main-color btn-lg text-white'
                                href='/search'>Перейти к поиску</a>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>

            </div>

            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'>  </div>
                        <div className='mt-2'>
                            <h1>Без книги – в мире ночь, без книги мрак кругом. (В. Гюго)</h1>
                            <a type='button' className='btn main-color btn-lg text-white'
                                href='/search'>Перейти к поиску</a>
                        </div>

                        <div className='mt-2'>
                            <div className='col-image-right'></div>
                            <div className='mt-2'>
                                <h1>В книге – память человеческого рода, она – рупор человеческой мысли. (В. Розанов)</h1>
                                <a type='button' className='btn main-color btn-lg text-white'
                                    href='/search'>Перейти к поиску</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div >
    );
}

export default CallAction;