import styles from './BackgroundImage.module.scss';

function BackgroundImage({ image }) {
	console.log(image);
	return (
		<div
			className={styles.backgroundImage}
			style={{ backgroundImage: `url(${image})` }}
		></div>
	);
}

export default BackgroundImage;
