export const variants = {
    active: {
        backgroundColor: '#4BB543',
        color: 'rgb(255, 255, 255)',
        transition: {
            duration: 0.7,
            // Display 'Saved' text for another 0.5s after finishing the animation
            repeatDelay: 0.5
        }
    },
    inActive: {
        transition: {
            delay: 0.5,
            duration: 0.7
        },
        backgroundColor: '#3E4A65',
    },
    failed: {
        backgroundColor: '#e33814',
        color: 'rgb(255, 255, 255)',
        transition: {
            duration: 0.7,
            // Display 'Saved' text for another 0.5s after finishing the animation
            repeatDelay: 0.5
        }
    }
};

export const loadingVariant = {
    saving: {
        left: '95%',
        transition: {
            flip: Infinity,
            ease: 'easeOut',
            duration: 0.8
        }
    }
};