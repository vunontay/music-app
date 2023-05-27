import images from '~/assets/images';
function Ads() {
    const myStyles = {
        width: '100%',
        height: '100%',
    };

    return (
        <div style={myStyles}>
            <div style={myStyles}>
                <img style={myStyles} src={images.ads} alt="ads" />
            </div>
        </div>
    );
}

export default Ads;
